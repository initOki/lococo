import { useStore } from '@/store';
import './style.scss';

const Tab = () => {
  const { characterList, setCharacterList, setOpenCharacterUUID } = useStore();

  const selectCharacter = (uuid: string) => {
    setOpenCharacterUUID(uuid);
  };

  const removeCharacter = (index: number) => {
    const copy = [...characterList];
    copy.splice(index, 1);
    setCharacterList(copy);
  };

  return (
    <div className="mb-[30px]">
      <ul className="main-character-list">
        {characterList.map((item: any, index: number) => {
          return (
            <li key={index} className="flex items-center mr-[20px] character-item cursor-pointer">
              <p onClick={() => selectCharacter(item.uuid)}>{item.mainCharacterName}</p>{' '}
              <button onClick={() => removeCharacter(index)}>X</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Tab;
