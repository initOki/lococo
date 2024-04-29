import { contentList } from '@/app/homework/components/contentList';

const Content = () => {
  return (
    <div className={`grid`} style={{ gridTemplateRows: `repeat(${contentList.length}, 50px)` }}>
      {contentList.map((content) => {
        return <p key={content.id}>{content.name}</p>;
      })}
    </div>
  );
};

export default Content;
