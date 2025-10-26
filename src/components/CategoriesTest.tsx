import { useCategoriesDB } from '../hooks/useCategoriesDB'

export const CategoriesTest = () => {
  const {
    categories,
    loading,
    error,
    addCategory,
    deleteCategory,
    updateCategory
  } = useCategoriesDB()

  if (loading) return <div>Cargando categorias...</div>

  return (
    <>
      <h2>Categorias</h2>
      <p>{error.add && <span>{error.add}</span>}</p>
      <p>{error.delete && <span>{error.delete}</span>}</p>
      <p>{error.update && <span>{error.update}</span>}</p>
      <p>{error.read && <span>{error.read}</span>}</p>
      <div>
        {categories.map((category) => (
          <div key={category.id}>
            <span>{category.name}</span>
            <button
              onClick={() => {
                updateCategory(category.id, { name: 'Transporte' })
              }}
            >
              Edit
            </button>
          </div>
        ))}
      </div>
      <div>
        <button
          onClick={() => {
            addCategory({ name: 'Mercado' })
          }}
        >
          Agregar Categoria
        </button>
      </div>
      <div>
        <button
          onClick={() => {
            deleteCategory(1)
          }}
        >
          Borrar Categoria
        </button>
        <button
          onClick={() => {
            console.log(categories)
          }}
        >
          Mostrar categorias
        </button>
      </div>
    </>
  )
}
