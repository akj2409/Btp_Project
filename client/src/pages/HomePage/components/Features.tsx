import React from "react";
import Feature from "./Feature";
import { HiDesktopComputer, HiChip } from "react-icons/hi";
import { BiCategoryAlt, BiGlobe } from "react-icons/bi";
import { MdAddTask, MdDashboardCustomize } from "react-icons/md";

const cards = [
  {
    icon: <BiCategoryAlt size="25px" color="#FF00C7" />,
    title: "Chatbots",
    text: "We so opinion friends me message as delight. Whole front do of plate heard oh ought.",
  },
  {
    icon: <HiDesktopComputer size="25px" color="#FF00C7" />,
    title: "Knowledgebase",
    text: "At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by.",
  },
  {
    icon: <MdAddTask size="25px" color="#FF00C7" />,
    title: "Education",
    text: "We so opinion friends me message as delight. Whole front do of plate heard oh ought.",
  },
  {
    icon: <HiChip size="25px" color="#FF00C7" />,
    title: "Chatbots",
    text: "At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by.",
  },
  {
    icon: <BiGlobe size="25px" color="#FF00C7" />,
    title: "Knowledgebase",
    text: "We so opinion friends me message as delight. Whole front do of plate heard oh ought.",
  },
  {
    icon: <MdDashboardCustomize size="25px" color="#FF00C7" />,
    title: "Education",
    text: "At jointure ladyship an insisted so humanity he. Friendly bachelor entrance to on by.",
  },
];

const Features = () => {
  return (
    <div className="flex flex-col p-8 mb-16 mx-24 bg-background xm:mx-12 xs:mx-4">
      <div className="flex flex-col justify-center items-center mx-0 my-8 vm:mb-0">
        <h1 className="font-manrope text-[44px]/[62px] font-semibold text-black text-center xm:text-[28px]/[40px]">
          Our Features and Services
        </h1>
        <p className="text-base font-normal max-w-[673px] text-center font-manrope text-grey vm:mt-4 xm:text-xs">
          Lorem ipsum dolor sit amet consectetur. Euismod diam phasellus quis
          aliquet purus sem ornare mollis vulputate. Sapien purus faucibus massa
          pharetra.{" "}
        </p>
      </div>
      <div className="flex flex-wrap flex-row justify-center items-center gap-8 mt-8 xs:my-4 xs:mx-0 xs:min-w-full">
        {cards.map((card, i) => (
          <Feature
            key={i}
            icon={card.icon}
            title={card.title}
            text={card.text}
          />
        ))}
      </div>
    </div>
  );
};

export default Features;
