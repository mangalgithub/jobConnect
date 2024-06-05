import { useState } from "react";

const TagsInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddTag = (event) => {
    if (event.key === "Enter" && inputValue) {
      setTags([...tags, inputValue]);
      setInputValue("");
    }
  };

  const handleRemoveTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col">
      <div className="flex flex-wrap items-center border border-gray-300 rounded p-2">
        {tags.map((tag, index) => (
          <div
            key={index}
            className="bg-blue-500 text-white rounded px-2 py-1 mr-2 mb-2 flex items-center"
          >
            {tag}
            <button
              className="ml-2 text-white"
              onClick={() => handleRemoveTag(index)}
            >
              &times;
            </button>
          </div>
        ))}
        <input
          type="text"
          className="flex-grow p-1 outline-none"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleAddTag}
          placeholder="Press enter to add skills"
        />
      </div>
    </div>
  );
};

export default TagsInput;
