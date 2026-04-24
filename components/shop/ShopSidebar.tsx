export default function ShopSidebar() {
  return (
    <aside className="shop-sidebar">
      <div className="filter-section">
        <h3 className="filter-title">Categorías</h3>
        <ul className="filter-list">
          <li>
            <button className="filter-btn active" data-category="all">
              <span>Todos los productos</span>
              <span className="filter-count">12</span>
            </button>
          </li>
          <li>
            <button className="filter-btn" data-category="laptops">
              <span>Portátiles</span>
              <span className="filter-count">4</span>
            </button>
          </li>
          <li>
            <button className="filter-btn" data-category="accesorios">
              <span>Accesorios</span>
              <span className="filter-count">4</span>
            </button>
          </li>
        </ul>
      </div>

      <div className="filter-section">
        <h3 className="filter-title">Marca</h3>
        <ul className="filter-list">
          <li>
            <label className="filter-checkbox">
              <input type="checkbox" name="brand" value="hp" />
              <span className="checkmark"></span>
              <span>HP</span>
            </label>
          </li>
          <li>
            <label className="filter-checkbox">
              <input type="checkbox" name="brand" value="dell" />
              <span className="checkmark"></span>
              <span>Dell</span>
            </label>
          </li>
          <li>
            <label className="filter-checkbox">
              <input type="checkbox" name="brand" value="lenovo" />
              <span className="checkmark"></span>
              <span>Lenovo</span>
            </label>
          </li>
        </ul>
      </div>

      <button className="btn btn-primary btn-block">Aplicar filtros</button>
    </aside>
  )
}
