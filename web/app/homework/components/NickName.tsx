'use client';
import { ChangeEvent, useEffect } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from '@/store';
import { contentList } from '@/app/homework/components/contentList';
import './style.scss';

const NickName = () => {
  const { apiToken, characterList, mainCharacter, isCharacter, setCharacterList, setMainCharacter, setIsCharacter } =
    useStore();
  const now = new Date();
  const day = now.getDay();
  const utcHours = now.getHours();
  const koreaHours = (utcHours + 9) % 24;

  const handleChangeMainCharacter = (e: ChangeEvent<HTMLInputElement>) => {
    setMainCharacter(e.target.value);
  };

  const getCharacterInfo = async () => {
    try {
      const response = await axios.get(
        `https://developer-lostark.game.onstove.com/characters/${mainCharacter}/siblings`,
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        },
      );

      if (!response) return toast.error('캐릭터 조회 실패.');
      const sorting = response.data.sort((a: any, b: any) => {
        let aAvgLevel = parseFloat(a.ItemAvgLevel.replace(',', ''));
        let bAvgLevel = parseFloat(b.ItemAvgLevel.replace(',', ''));
        return bAvgLevel - aAvgLevel;
      });

      const aa: any[] = [];
      sorting.map((item: any) => {
        const ab = {
          ...item,
          contents: contentList.map((item) => {
            return { ...item, uid: uuidv4() };
          }),
        };
        aa.push(ab);
      });
      setCharacterList(aa);
      setIsCharacter(true);
      toast.success('캐릭터 조회 성공.');
    } catch (error) {
      //
    }
  };

  const handleCheckItem = (uid: string) => {
    characterList.map((item: any) => {
      item.contents.map((content: any) => {
        if (content.uid === uid) {
          content.isChecked = !content.isChecked;
        }
      });
    });
    setCharacterList(characterList);
  };

  useEffect(() => {
    if (characterList.length === 0) return;
    if (day > 3 || (day === 3 && koreaHours >= 6)) {
      characterList.map((item) => {
        item.contents.map((content: any) => {
          if (content.reset === 'week') {
            content.isChecked = false;
          }
        });
      });
      setCharacterList(characterList);
    } else if (koreaHours >= 6) {
      characterList.map((item) => {
        item.contents.map((content: any) => {
          if (content.reset === 'day') {
            content.isChecked = false;
          }
        });
      });
      setCharacterList(characterList);
    }
  }, [characterList]);

  return (
    <div className="nickname-box">
      <div className="flex items-center mb-[20px]">
        <p>대표 캐릭터명: </p>
        <input
          type="text"
          value={mainCharacter}
          className="ml-[20px]"
          onChange={(e) => handleChangeMainCharacter(e)}
          disabled={isCharacter}
        />
        {isCharacter ? (
          <button onClick={() => setIsCharacter(false)}>변경</button>
        ) : (
          <button onClick={() => getCharacterInfo()}>조회</button>
        )}
      </div>
      <div className="flex">
        {characterList && characterList.length > 0 ? (
          <div
            className="character-name-box"
            style={{ gridTemplateColumns: `150px repeat(${characterList.length}, 1fr)` }}
          >
            <div className="grid" style={{ gridTemplateRows: `56px repeat(${contentList.length}, 50px)` }}>
              <div></div>
              {contentList.map((content) => {
                return (
                  <p key={content.id} className="flex items-center">
                    {content.name}
                  </p>
                );
              })}
            </div>
            {characterList.map((item: any, index: number) => (
              <div className="flex flex-col" key={index}>
                <div key={index} className="pl-[15px] pr-[15px] mb-[10px] whitespace-nowrap">
                  <p className={'text-center text-[16px]'}>{item.CharacterName}</p>
                  <p className={'text-center text-[14px]'}>{item.ItemAvgLevel}</p>
                </div>
                <div className={'grid'} style={{ gridTemplateRows: `repeat(${contentList.length}, 50px)` }}>
                  {item.contents?.map((content: any) => {
                    return (
                      <p key={content.id} className="flex items-center justify-center content-checked-item">
                        <input
                          type="checkbox"
                          className="checkbox-item"
                          onChange={() => handleCheckItem(content.uid)}
                          checked={content.isChecked}
                        />
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div>캐릭터 조회 하셈</div>
        )}
      </div>
    </div>
  );
};

export default NickName;
