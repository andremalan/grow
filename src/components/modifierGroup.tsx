import { Text, Select } from "@chakra-ui/react";
import { CartItem } from "./cart";
import { formatPrice } from "../utils/formatPrice";
import { ModifierGroup } from "../graphql/queries";

export const ModifierSelector: React.FC<{
  modifierGroup: ModifierGroup;
  onSelect: (item: CartItem) => void;
}> = ({ modifierGroup, onSelect }) => {
  const onChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const item = modifierGroup.modifiers
      .map((modifier) => modifier.item)
      .find((item) => item.identifier === event.target.value);
    if (item) {
      onSelect({
        identifier: item.identifier,
        label: item.label,
        price: item.price,
      });
    }
  };
  return (
    <div>
      <Text>{modifierGroup.label}</Text>
      <Select placeholder="Select modifier" onChange={onChange}>
        {[...modifierGroup.modifiers]
          .sort((a, b) => (a.displayOrder < b.displayOrder ? -1 : 1))
          .map((modifier, index) => (
            <option value={modifier.item.identifier} key={index}>
              {`${modifier.item.label}: $${formatPrice(modifier.item.price)}`}
            </option>
          ))}
      </Select>
    </div>
  );
};
