import Image from 'next/image';

const Kamen = () => {
  return (
    <div>
      <Image src="/cheat_sheet_image/kamen_1_normal.jpeg" alt="kamen" width={800} height={1000} />
      <Image src="/cheat_sheet_image/kamen_2_normal.jpeg" alt="kamen" width={800} height={1000} />
      <div className="pt-[20px] pb-[20px]"></div>
      <Image src="/cheat_sheet_image/kamen_1_hard.jpeg" alt="kamen" width={800} height={1000} />
      <Image src="/cheat_sheet_image/kamen_2_hard.jpeg" alt="kamen" width={800} height={1000} />
      <Image src="/cheat_sheet_image/kamen_3_1_hard.jpeg" alt="kamen" width={800} height={1000} />
      <Image src="/cheat_sheet_image/kamen_3_2_hard.jpeg" alt="kamen" width={800} height={1000} />
    </div>
  );
};

export default Kamen;
