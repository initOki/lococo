import { type ChangeEvent, useState } from 'react';
import axios from 'axios';
import { useStore } from '~shared/store';
import { toast } from 'sonner';
import Loading from '~shared/loading/Loading.tsx';
import { v4 as uuidv4 } from 'uuid';

const SearchCharacter = () => {
  const { apiToken, characterList, setOpenCharacterUUID, setCharacterList } = useStore();
  const [isLoading, setIsLoading] = useState(false);
  const [characterName, setCharacterName] = useState('');

  const handleChangeCharacterName = (e: ChangeEvent<HTMLInputElement>) => {
    setCharacterName(e.target.value);
  };

  const getCharacterInfo = async () => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://developer-lostark.game.onstove.com/characters/${characterName}/siblings`,
        {
          headers: {
            Authorization: `Bearer ${apiToken}`,
          },
        },
      );

      if (response.data === null || !response.data) {
        toast.error('캐릭터 조회 실패');
        return;
      }

      const data = response.data;
      const copyData = [...data];
      const nowCharacterList = [...characterList];

      copyData.map((item) => {
        item.id = uuidv4();
        item.isFavorite = false;
        item.homework = {
          raid: [false, false, false],
        };
      });
      const searchCharacter = {
        item_id: uuidv4(),
        mainCharacter: characterName,
        characterList: copyData,
      };
      nowCharacterList.push(searchCharacter);
      setCharacterList(nowCharacterList);
      setCharacterName('');
    } catch (error) {
      //
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex">
      <input
        type="text"
        className="w-full max-w-[300px] mr-[15px] default-input"
        placeholder="추가하려는 캐릭터의 이름을 작성해주세요."
        onChange={handleChangeCharacterName}
        value={characterName}
      />
      <button className="max-w-[100px] default-button" onClick={() => getCharacterInfo()}>
        {!isLoading ? (
          '검색'
        ) : (
          <span>
            <Loading className="w-full h-[30px]" />
          </span>
        )}
      </button>
    </div>
  );
};

export default SearchCharacter;
