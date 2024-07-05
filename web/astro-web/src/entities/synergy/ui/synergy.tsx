import { useSynergy } from '../lib';
import { useSynergyStates } from '../lib/use-state.ts';

const Synergy = () => {
  const { searchText, searchResult, setSearchResult, setSearchText } = useSynergyStates();
  const { handleChange, highlight, returnSynergy, findSynergy } = useSynergy();

  return (
    <div>
      <div className="flex items-center">
        <input
          type="text"
          className="default-input mr-[15px] max-w-[200px]"
          placeholder="시너지 또는 직업 입력"
          onChange={(e) => handleChange(e, setSearchText)}
        />
        <button
          className="default-button max-w-[100px]"
          onClick={() => findSynergy(searchText, setSearchResult)}
          style={{ padding: '9px' }}
        >
          검색
        </button>
      </div>
      <div className="flex">
        <table className="default-table">
          <thead>
            <tr>
              <td>시너지</td>
              <td>상시</td>
              <td>순간</td>
              {/* <td>효율</td> */}
            </tr>
          </thead>
          <tbody>
            <tr className={searchResult.includes('critical chance') ? 'isSearched' : ''}>
              <td>치명타 확률 증가</td>
              <td>
                {returnSynergy('critical chance')?.always.map((item) => {
                  return (
                    <span className={`mr-[5px] ${highlight(item.name, searchText) ? 'isHightlight' : ''}`}>
                      {item.name}
                    </span>
                  );
                })}
              </td>
              <td>
                {returnSynergy('critical chance')?.moment.map((item) => {
                  return (
                    <span className={`mr-[5px] ${highlight(item.name, searchText) ? 'isHightlight' : ''}`}>
                      {item.name}
                    </span>
                  );
                })}
              </td>
              {/* <td>시너지 업, 효율 다운 / 순간 (극특) 5.7 ~ 6.7%, 상시 치적 6.5 ~ 9.5%, 순간 (극신) 6 ~ 10%</td> */}
            </tr>
            <tr className={searchResult.includes('critical damage') ? 'isSearched' : ''}>
              <td>치명타 시 피해 증가</td>
              <td>
                {returnSynergy('critical damage')?.always.map((item) => {
                  return (
                    <span className={`mr-[5px] ${highlight(item.name, searchText) ? 'isHightlight' : ''}`}>
                      {item.name}
                    </span>
                  );
                })}
              </td>
              <td>
                {returnSynergy('critical damage')?.moment.map((item) => {
                  return (
                    <span className={`mr-[5px] ${highlight(item.name, searchText) ? 'isHightlight' : ''}`}>
                      {item.name}
                    </span>
                  );
                })}
              </td>
              {/* <td>시너지 업, 효율 다운 / 순간 (극특) 5.7 ~ 6.7%, 상시 치적 6.5 ~ 9.5%, 순간 (극신) 6 ~ 10%</td> */}
            </tr>
            <tr className={searchResult.includes('damage') ? 'isSearched' : ''}>
              <td>공격력 증가</td>
              <td>
                {returnSynergy('damage')?.always.map((item) => {
                  return (
                    <span className={`mr-[5px] ${highlight(item.name, searchText) ? 'isHightlight' : ''}`}>
                      {item.name}
                    </span>
                  );
                })}
              </td>
              <td>
                {returnSynergy('damage')?.moment.map((item) => {
                  return (
                    <span className={`mr-[5px] ${highlight(item.name, searchText) ? 'isHightlight' : ''}`}>
                      {item.name}
                    </span>
                  );
                })}
              </td>
              {/* <td>시너지 업, 효율 다운 / 순간 (극특) 5.7 ~ 6.7%, 상시 치적 6.5 ~ 9.5%, 순간 (극신) 6 ~ 10%</td> */}
            </tr>
            <tr className={searchResult.includes('increased damage taken') ? 'isSearched' : ''}>
              <td>받는 피해 증가</td>
              <td>
                {returnSynergy('increased damage taken')?.always.map((item) => {
                  return (
                    <span className={`mr-[5px] ${highlight(item.name, searchText) ? 'isHightlight' : ''}`}>
                      {item.name}
                    </span>
                  );
                })}
              </td>
              <td>
                {returnSynergy('increased damage taken')?.moment.map((item) => {
                  return (
                    <span className={`mr-[5px] ${highlight(item.name, searchText) ? 'isHightlight' : ''}`}>
                      {item.name}
                    </span>
                  );
                })}
              </td>
              {/* <td>시너지 업, 효율 다운 / 순간 (극특) 5.7 ~ 6.7%, 상시 치적 6.5 ~ 9.5%, 순간 (극신) 6 ~ 10%</td> */}
            </tr>
            <tr className={searchResult.includes('defense decrease') ? 'isSearched' : ''}>
              <td>방어력 감소</td>
              <td>
                {returnSynergy('defense decrease')?.always.map((item) => {
                  return (
                    <span className={`mr-[5px] ${highlight(item.name, searchText) ? 'isHightlight' : ''}`}>
                      {item.name}
                    </span>
                  );
                })}
              </td>
              <td>
                {returnSynergy('defense decrease')?.moment.map((item) => {
                  return (
                    <span className={`mr-[5px] ${highlight(item.name, searchText) ? 'isHightlight' : ''}`}>
                      {item.name}
                    </span>
                  );
                })}
              </td>
              {/* <td>시너지 업, 효율 다운 / 순간 (극특) 5.7 ~ 6.7%, 상시 치적 6.5 ~ 9.5%, 순간 (극신) 6 ~ 10%</td> */}
            </tr>
            <tr className={searchResult.includes('head attack, back attack damage increase') ? 'isSearched' : ''}>
              <td>헤드어택, 백어택 피해 증가</td>
              <td>
                {returnSynergy('head attack, back attack damage increase')?.always.map((item) => {
                  return (
                    <span className={`mr-[5px] ${highlight(item.name, searchText) ? 'isHightlight' : ''}`}>
                      {item.name}
                    </span>
                  );
                })}
              </td>
              <td>
                {returnSynergy('head attack, back attack damage increase')?.moment.map((item) => {
                  return (
                    <span className={`mr-[5px] ${highlight(item.name, searchText) ? 'isHightlight' : ''}`}>
                      {item.name}
                    </span>
                  );
                })}
              </td>
              {/* <td>시너지 업, 효율 다운 / 순간 (극특) 5.7 ~ 6.7%, 상시 치적 6.5 ~ 9.5%, 순간 (극신) 6 ~ 10%</td> */}
            </tr>
            <tr className={searchResult.includes('damage reduction, shield') ? 'isSearched' : ''}>
              <td>피해 감소, 보호막</td>
              <td>
                {returnSynergy('damage reduction, shield')?.always.map((item) => {
                  return (
                    <span className={`mr-[5px] ${highlight(item.name, searchText) ? 'isHightlight' : ''}`}>
                      {item.name}
                    </span>
                  );
                })}
              </td>
              <td>
                {returnSynergy('damage reduction, shield')?.moment.map((item) => {
                  return (
                    <span className={`mr-[5px] ${highlight(item.name, searchText) ? 'isHightlight' : ''}`}>
                      {item.name}
                    </span>
                  );
                })}
              </td>
              {/* <td>시너지 업, 효율 다운 / 순간 (극특) 5.7 ~ 6.7%, 상시 치적 6.5 ~ 9.5%, 순간 (극신) 6 ~ 10%</td> */}
            </tr>
            <tr className={searchResult.includes('increased disabling damage') ? 'isSearched' : ''}>
              <td>무력화 피해 증가</td>
              <td>
                {returnSynergy('increased disabling damage')?.always.map((item) => {
                  return (
                    <span className={`mr-[5px] ${highlight(item.name, searchText) ? 'isHightlight' : ''}`}>
                      {item.name}
                    </span>
                  );
                })}
              </td>
              <td>
                {returnSynergy('increased disabling damage')?.moment.map((item) => {
                  return (
                    <span className={`mr-[5px] ${highlight(item.name, searchText) ? 'isHightlight' : ''}`}>
                      {item.name}
                    </span>
                  );
                })}
              </td>
              {/* <td>시너지 업, 효율 다운 / 순간 (극특) 5.7 ~ 6.7%, 상시 치적 6.5 ~ 9.5%, 순간 (극신) 6 ~ 10%</td> */}
            </tr>
            <tr className={searchResult.includes('attack speed increase') ? 'isSearched' : ''}>
              <td>공격속도 증가</td>
              <td>
                {returnSynergy('attack speed increase')?.always.map((item) => {
                  return (
                    <span className={`mr-[5px] ${highlight(item.name, searchText) ? 'isHightlight' : ''}`}>
                      {item.name}
                    </span>
                  );
                })}
              </td>
              <td>
                {returnSynergy('attack speed increase')?.moment.map((item) => {
                  return (
                    <span className={`mr-[5px] ${highlight(item.name, searchText) ? 'isHightlight' : ''}`}>
                      {item.name}
                    </span>
                  );
                })}
              </td>
              {/* <td>시너지 업, 효율 다운 / 순간 (극특) 5.7 ~ 6.7%, 상시 치적 6.5 ~ 9.5%, 순간 (극신) 6 ~ 10%</td> */}
            </tr>
            <tr className={searchResult.includes('move speed increase') ? 'isSearched' : ''}>
              <td>이동속도 증가</td>
              <td>
                {returnSynergy('move speed increase')?.always.map((item) => {
                  return (
                    <span className={`mr-[5px] ${highlight(item.name, searchText) ? 'isHightlight' : ''}`}>
                      {item.name}
                    </span>
                  );
                })}
              </td>
              <td>
                {returnSynergy('move speed increase')?.moment.map((item) => {
                  return (
                    <span className={`mr-[5px] ${highlight(item.name, searchText) ? 'isHightlight' : ''}`}>
                      {item.name}
                    </span>
                  );
                })}
              </td>
              {/* <td>시너지 업, 효율 다운 / 순간 (극특) 5.7 ~ 6.7%, 상시 치적 6.5 ~ 9.5%, 순간 (극신) 6 ~ 10%</td> */}
            </tr>
            <tr className={searchResult.includes('mana recovery') ? 'isSearched' : ''}>
              <td>마나회복</td>
              <td>
                {returnSynergy('mana recovery')?.always.map((item) => {
                  return (
                    <span className={`mr-[5px] ${highlight(item.name, searchText) ? 'isHightlight' : ''}`}>
                      {item.name}
                    </span>
                  );
                })}
              </td>
              <td>
                {returnSynergy('mana recovery')?.moment.map((item) => {
                  return (
                    <span className={`mr-[5px] ${highlight(item.name, searchText) ? 'isHightlight' : ''}`}>
                      {item.name}
                    </span>
                  );
                })}
              </td>
              {/* <td>시너지 업, 효율 다운 / 순간 (극특) 5.7 ~ 6.7%, 상시 치적 6.5 ~ 9.5%, 순간 (극신) 6 ~ 10%</td> */}
            </tr>
            <tr className={searchResult.includes('purification') ? 'isSearched' : ''}>
              <td>정화</td>
              <td>
                {returnSynergy('purification')?.always.map((item) => {
                  return (
                    <span className={`mr-[5px] ${highlight(item.name, searchText) ? 'isHightlight' : ''}`}>
                      {item.name}
                    </span>
                  );
                })}
              </td>
              <td>
                {returnSynergy('purification')?.moment.map((item) => {
                  return (
                    <span className={`mr-[5px] ${highlight(item.name, searchText) ? 'isHightlight' : ''}`}>
                      {item.name}
                    </span>
                  );
                })}
              </td>
              {/* <td>시너지 업, 효율 다운 / 순간 (극특) 5.7 ~ 6.7%, 상시 치적 6.5 ~ 9.5%, 순간 (극신) 6 ~ 10%</td> */}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Synergy;
