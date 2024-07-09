import { useStore } from '~shared/store';
import { useEffect, useRef, useState } from 'react';
import StarIcon from '~shared/icon/star.tsx';

const CharacterList = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const ref = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const { commonHomeWork, characterList, selectedCharacter, openCharacterUUID, setCharacterList, setCommonHomeWork } =
    useStore();
  const [showList, setShowList] = useState<any>([]);

  const handleClickFavorite = (uuid: string) => {
    const find = characterList.map((item) => {
      item.characterList.find((item: any) => {
        if (item.id === uuid) {
          item.homework.isFavorite = !item.homework.isFavorite;
        }
      });
      return item;
    });
    setCharacterList(find);
  };

  const allCheckedItem = () => {
    const find = characterList.find((item) => item.item_id === openCharacterUUID);
    console.log(find);
  };

  const handleClickCommonHomeWork = (homework: string) => {
    switch (homework) {
      case 'guardian':
        const copyCommonHomeWorkWeekGuardian = { ...commonHomeWork };
        copyCommonHomeWorkWeekGuardian.homework.weekGuardian = !copyCommonHomeWorkWeekGuardian.homework.weekGuardian;
        setCommonHomeWork(copyCommonHomeWorkWeekGuardian);
        return;
      case 'dungeon':
        const copyCommonHomeWorkDungeon = { ...commonHomeWork };
        copyCommonHomeWorkDungeon.homework.weekDungeon = !copyCommonHomeWorkDungeon.homework.weekDungeon;
        setCommonHomeWork(copyCommonHomeWorkDungeon);
        return;
      case 'epona':
        const copyCommonHomeWorkEpona = { ...commonHomeWork };
        copyCommonHomeWorkEpona.homework.weekEpona = !copyCommonHomeWorkEpona.homework.weekEpona;
        setCommonHomeWork(copyCommonHomeWorkEpona);
        return;
      default:
        return;
    }
  };

  useEffect(() => {
    if (characterList.length === 0) return;
    const find = characterList.find((item) => item.item_id === openCharacterUUID);
    setShowList(find.characterList);
  }, [openCharacterUUID]);

  useEffect(() => {
    setHeight(window.innerHeight - 300);
  }, []);

  useEffect(() => {
    allCheckedItem();
  }, [characterList]);

  // useEffect(() => {
  //   if (wrapperRef.current === null || ref.current === null) return;
  //   if (wrapperRef.current.offsetHeight < ref.current.offsetHeight) {
  //     setHeight(window.innerHeight - 300);
  //   }
  // }, []);

  return (
    <div className="character-wrapper" ref={wrapperRef}>
      <div>
        <div className="common-homework-box">
          <span>도전가디언토벌</span>
          <input
            type="checkbox"
            className="w-[20px] h-[20px]"
            onChange={() => handleClickCommonHomeWork('guardian')}
            checked={commonHomeWork.homework.weekGuardian}
          />
        </div>
        <div className="common-homework-box">
          <span>도전어비스던전</span>
          <input
            type="checkbox"
            className="w-[20px] h-[20px]"
            onChange={() => handleClickCommonHomeWork('dungeon')}
            checked={commonHomeWork.homework.weekDungeon}
          />
        </div>
        <div className="common-homework-box">
          <span>주간 에포나</span>
          <input
            type="checkbox"
            className="w-[20px] h-[20px]"
            onChange={() => handleClickCommonHomeWork('epona')}
            checked={commonHomeWork.homework.weekEpona}
          />
        </div>
      </div>
      {characterList.length > 0 ? (
        <div className={`character-list-box`} ref={ref} style={{ height: `${height}px` }}>
          {showList.map((item: any, _: number) => {
            return (
              <div key={_}>
                <span className="character-name font-bold">
                  {item.CharacterName}
                  <button onClick={() => handleClickFavorite(item.id)}>
                    <StarIcon favorite={item.homework.isFavorite} />
                  </button>
                </span>
                <div className="w-full">
                  <div className="character-list-detail mb-[10px]">
                    <span className="text-[#FFFFFF] mr-[15px]">레이드</span>
                    <div className="flex">
                      <input type="checkbox" />
                      <input type="checkbox" />
                      <input type="checkbox" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="flex items-center justify-center w-full">
          <span className="text-[#FFFFFF]">캐릭터를 등록해주세요.</span>
        </div>
      )}
    </div>
  );
};

export default CharacterList;
