import {useState} from "react";
import {motion} from "framer-motion";

import Text from "../../texts/text";
import store from "../../../store";
import {setSelectedOption} from "../../../store/products/actions";
import useHandlerKeyPress from "../../../hooks/useHandlerKeyPress";

import {CategoryFilterContainer, OptionContainer, SelectController} from "./containers";

const CategoryFilter = () => {
  const {
    state: {products},
    dispatch,
  } = store.useStore();
  const [open, setOpen] = useState(false);
  const toggleOpenOptions = () => {
    products.options.length && setOpen((open) => !open);
  };
  const onKeyPress = useHandlerKeyPress(() => toggleOpenOptions());

  return (
    <CategoryFilterContainer>
      <Text className="category-title" color="gray600">
        Filter by:
      </Text>
      <div className="controllers">
        <SelectController tabIndex={2} onClick={toggleOpenOptions} onKeyPress={onKeyPress}>
          <Text color="gray600" data-testid="selected-option">
            {products.selectedOption}
          </Text>
        </SelectController>
        {open && products.options.length && (
          <OptionContainer animate={{y: 0}} as={motion.div} initial={{y: -59}} role="tablist">
            {products.options.map((option, idx) => (
              <div
                key={option}
                aria-selected={idx === 0 ? "true" : "false"}
                className="option-item"
                role="tab"
                tabIndex={idx + 2}
                onClick={() => {
                  dispatch(setSelectedOption(option));
                  toggleOpenOptions();
                }}
                onKeyPress={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    dispatch(setSelectedOption(option));
                    toggleOpenOptions();
                  }
                }}
              >
                <Text
                  as={motion.p}
                  color="gray600"
                  transition={{type: "spring", stiffness: 300}}
                  whileHover={{scale: 1.05, originX: 0}}
                >
                  {option}
                </Text>
              </div>
            ))}
          </OptionContainer>
        )}
      </div>
    </CategoryFilterContainer>
  );
};

export default CategoryFilter;
