import { useStore } from '~shared/store';

const SelectTab = () => {
  const { characterList, setOpenCharacterUUID, setCharacterList } = useStore();

  const handleClickRemoveCharacter = (item_id: string) => {
    const filter = characterList.filter((item) => item.item_id !== item_id);
    setCharacterList(filter);
    if (filter.length > 0) {
      setOpenCharacterUUID(filter[0].item_id);
    } else {
      setOpenCharacterUUID('');
    }
  };

  return (
    <div className="select-tab">
      <ul>
        {characterList.map((item, _) => {
          return (
            <li key={_}>
              <span className="text-[#FFFFFF] cursor-pointer" onClick={() => setOpenCharacterUUID(item.item_id)}>
                {item.mainCharacter}
              </span>
              <button
                className="text-[#FFFFFF] remove"
                onClick={() => handleClickRemoveCharacter(item.item_id)}
              ></button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SelectTab;
