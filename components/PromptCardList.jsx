import PromptCard from "./PromptCard"

const PromptCardList = ({ data, handleTagClick, handleEdit, handleDelete }) => {

  return (
    <div className="mt-16 prompt_layout">
      {data && data.map((item, i) => (
        <>
          <PromptCard
            key={item._id}
            post={item}
            handleTagClick={handleTagClick}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
          />
        </>
      ))}
    </div>
  )
}

export default PromptCardList