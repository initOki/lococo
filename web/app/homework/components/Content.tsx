import { contentList } from '@/app/homework/components/contentList';
import Tab from './Tab';

const Content = () => {
  return (
    <div>
      <div className={`grid`} style={{ gridTemplateRows: `repeat(${contentList.length}, 50px)` }}>
        {contentList.map((content) => {
          return <p key={content.id}>{content.name}</p>;
        })}
      </div>
    </div>
  );
};

export default Content;
