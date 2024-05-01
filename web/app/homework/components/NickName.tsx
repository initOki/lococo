'use client';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { useStore } from '@/store';
import { contentList } from '@/app/homework/components/contentList';
import './style.scss';
import Tab from './Tab';

const useGettingWidth = () => {
  const [width, setWidth] = useState<any>(null);

  const boxRef = useCallback((node: HTMLElement) => {
    if (node !== null) {
      setWidth(node.getBoundingClientRect().width);
    }
  }, []);

  return [width, boxRef];
};

const NickName = () => {
  const {
    apiToken, //
    characterList,
    mainCharacter,
    isCharacter,
    openCharacterUUID,
    setCharacterList,
    setMainCharacter,
    setIsCharacter,
  } = useStore();
  const [openCharacter, setOpenCharacter] = useState<any | null>(null);
  const [lazyWidth, lazyRef] = useGettingWidth();
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

      const copy = [...characterList];
      const newData = {
        uuid: uuidv4(),
        mainCharacterName: mainCharacter,
        data: aa,
      };

      copy.push(newData);

      setCharacterList(copy);
      setIsCharacter(true);
      toast.success('캐릭터 조회 성공.');
    } catch (error) {
      //
    }
  };

  const handleCheckItem = (uid: string) => {
    const find = characterList.find((item) => item.uuid === openCharacterUUID);
    find.data.map((item: any) => {
      item.contents.map((content: any) => {
        if (content.uid === uid) {
          content.isChecked = !content.isChecked;
        }
      });
    });

    const filter = characterList.filter((item) => item.uuid !== openCharacterUUID);
    filter.push(find);
    setCharacterList(filter);
  };

  // useEffect(() => {
  //   if (characterList.length === 0) return;
  //   if (day > 3 || (day === 3 && koreaHours >= 6)) {
  //     characterList.map((item) => {
  //       item.contents.map((content: any) => {
  //         if (content.reset === 'week') {
  //           content.isChecked = false;
  //         }
  //       });
  //     });
  //     setCharacterList(characterList);
  //   } else if (koreaHours >= 6) {
  //     characterList.map((item) => {
  //       item.contents.map((content: any) => {
  //         if (content.reset === 'day') {
  //           content.isChecked = false;
  //         }
  //       });
  //     });
  //     setCharacterList(characterList);
  //   }
  // }, [characterList]);

  useEffect(() => {
    if (characterList.length === 0) return;
    const find = characterList.find((item) => item.uuid === openCharacterUUID);
    if (find) {
      setOpenCharacter(find);
    }
  }, [openCharacterUUID]);

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
          <button onClick={() => getCharacterInfo()}>조회 및 추가</button>
        )}
      </div>

      <Tab />

      <div className="flex">
        {openCharacter && openCharacter.data.length > 0 ? (
          <div
            className="character-name-box"
            style={{ gridTemplateColumns: `150px repeat(${openCharacter.data.length}, 1fr)` }}
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

            <div
              ref={lazyRef}
              className={`todo-box overflow-scroll w-[1000px]`}
              style={{ gridTemplateColumns: `repeat(${openCharacter.data.length}, 180px)` }}
            >
              {openCharacter.data.map((item: any, index: number) => (
                <div className="flex flex-col" key={index}>
                  <div key={index} className="pl-[15px] pr-[15px] mb-[10px] whitespace-nowrap">
                    <p className={'text-center text-[16px]'}>{item.CharacterName}</p>
                    <p className={'text-center text-[14px]'}>{item.CharacterClassName}</p>
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
          </div>
        ) : (
          <div>캐릭터 조회 하셈</div>
        )}
      </div>
    </div>
  );
};

export default NickName;
