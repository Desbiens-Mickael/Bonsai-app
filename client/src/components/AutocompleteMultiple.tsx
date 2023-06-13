// import React, { useState, ChangeEvent } from "react";
// import {
//   Box,
//   Input,
//   List,
//   ListItem,
//   VStack,
//   Tag,
//   TagLabel,
//   TagCloseButton,
// } from "@chakra-ui/react";

// interface Suggestion {
//   id: string;
//   name: string;
// }

// interface AutocompleteMultipleProps {
//   suggestions: Suggestion[];
// }

// const AutocompleteMultiple: React.FC<AutocompleteMultipleProps> = ({
//   suggestions,
// }) => {
//   const [inputValue, setInputValue] = useState<string>("");
//   const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>(
//     []
//   );
//   const [selectedItems, setSelectedItems] = useState<Suggestion[]>([]);

//   const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
//     const value = event.target.value;
//     setInputValue(value);

//     if (value.length > 0) {
//       const filtered = suggestions.filter((suggestion) =>
//         suggestion.name.toLowerCase().includes(value.toLowerCase())
//       );
//       setFilteredSuggestions(filtered);
//     } else {
//       setFilteredSuggestions([]);
//     }
//   };

//   const handleSelect = (suggestion: Suggestion) => {
//     setInputValue("");
//     setFilteredSuggestions([]);
//     if (!selectedItems.find((item) => item.id === suggestion.id)) {
//       setSelectedItems([...selectedItems, suggestion]);
//     }
//   };

//   const handleRemoveItem = (id: string) => {
//     setSelectedItems(selectedItems.filter((item) => item.id !== id));
//   };

//   return (
//     <VStack spacing={4} align="stretch">
//       <Box>
//         {selectedItems.map((item) => (
//           <Tag key={item.id} size="md" variant="solid" colorScheme="blue" m={1}>
//             <TagLabel>{item.name}</TagLabel>
//             <TagCloseButton onClick={() => handleRemoveItem(item.id)} />
//           </Tag>
//         ))}
//         <Input
//           value={inputValue}
//           onChange={handleInputChange}
//           placeholder="Rechercher une espèce..."
//         />
//       </Box>
//       {filteredSuggestions.length > 0 && (
//         <Box border="1px" borderColor="gray.200" borderRadius="md">
//           <List spacing={1}>
//             {filteredSuggestions.map((suggestion) => (
//               <ListItem
//                 key={suggestion.id}
//                 p={2}
//                 onClick={() => handleSelect(suggestion)}
//                 _hover={{ bg: "gray.100", cursor: "pointer" }}
//                 cursor={"pointer"}
//               >
//                 {suggestion.name}
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       )}
//     </VStack>
//   );
// };

// export default AutocompleteMultiple;

import React, { useState, ChangeEvent, FocusEvent } from "react";
import {
  Box,
  Input,
  List,
  ListItem,
  VStack,
  Tag,
  TagLabel,
  TagCloseButton,
} from "@chakra-ui/react";

interface Suggestion {
  id: number;
  name: string;
}

interface AutocompleteMultipleProps {
  suggestions: Suggestion[];
  multiple?: boolean;
  value: (arg: number | number[]) => void;
  defaultValue?: string;
}

const AutocompleteMultiple: React.FC<AutocompleteMultipleProps> = ({
  suggestions,
  multiple = false,
  value,
  defaultValue = "",
}) => {
  const [inputValue, setInputValue] = useState<string>(defaultValue);
  const [selectedItems, setSelectedItems] = useState<Suggestion[]>([]);
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>(
    []
  );

  // permet de filtrer les suggestions en fonction de la valeur de l'input
  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const changeValue = event.target.value;
    setInputValue(changeValue);

    if (value.length > 0) {
      const filtered = suggestions.filter(
        (suggestion) =>
          suggestion.name.toLowerCase().includes(changeValue.toLowerCase()) &&
          !selectedItems.includes(suggestion)
      );
      setFilteredSuggestions(filtered);
    } else {
      setFilteredSuggestions([]);
    }
  };

  // Affiche toutes les suggestions quand l'input est focus
  const handleInputFocus = () => {
    setFilteredSuggestions(
      suggestions.filter((suggestion) => !selectedItems.includes(suggestion))
    );
  };

  // Cache les suggestions quand l'input perd le focus
  const handleInputBlur = () => {
    setTimeout(() => {
      setFilteredSuggestions([]);
    }, 100);
  };

  // Ajoute une suggestion aux tableaux de suggestions sélectionnées
  const handleSelect = (suggestion: Suggestion) => {
    if (!multiple) {
      setInputValue(suggestion.name);
      value(suggestion.id);
    } else {
      setInputValue("");
      setFilteredSuggestions([]);
      value(selectedItems.map((item) => item.id));
      if (!selectedItems.find((item) => item.id === suggestion.id)) {
        setSelectedItems([...selectedItems, suggestion]);
      }
    }
  };

  const handleRemoveItem = (id: number) => {
    setSelectedItems(selectedItems.filter((item) => item.id !== id));
  };
  return (
    <VStack spacing={4} align="stretch">
      <Box>
        {multiple &&
          selectedItems.map((item) => (
            <Tag
              key={item.id}
              size="md"
              variant="solid"
              colorScheme="blue"
              m={1}
            >
              <TagLabel>{item.name}</TagLabel>
              <TagCloseButton onClick={() => handleRemoveItem(item.id)} />
            </Tag>
          ))}
        <Input
          value={inputValue}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="Rechercher une espèce..."
        />
      </Box>
      {filteredSuggestions.length > 0 && (
        <Box
          border="1px"
          borderColor="gray.200"
          borderRadius="md"
          maxHeight={"250px"}
          overflowY={"auto"}
        >
          <List spacing={1}>
            {filteredSuggestions.map((suggestion) => (
              <ListItem
                key={suggestion.id}
                p={2}
                onClick={() => handleSelect(suggestion)}
                _hover={{ bg: "gray.100", cursor: "pointer" }}
                cursor={"pointer"}
              >
                {suggestion.name}
              </ListItem>
            ))}
          </List>
        </Box>
      )}
    </VStack>
  );
};

export default AutocompleteMultiple;
