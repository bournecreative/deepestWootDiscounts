import { WootItem } from '../../pages/Home';
import './tableData.scss';

interface TableDataProps {
  items: WootItem[];
}

export const TableData: React.FC<TableDataProps> = ({ items }) => {
  return (
    <div className="table_container">
      {items.length ? (
        <table className="table">
          <thead className="table_header">
            <tr className="table_row">
              <th className="header_cell">Rank</th>
              <th className="header_cell">Product Description</th>
              <th className="header_cell">List Price</th>
              <th className="header_cell">Sale Price</th>
              <th className="header_cell">Savings</th>
              <th className="header_cell">Link</th>
            </tr>
          </thead>
          <tbody className="table_body">
            {items.map((item: WootItem, index) => {
              return (
                <tr className="table_row" key={item.OfferId}>
                  <td className="body_cell">{index + 1}</td>
                  <td className="body_cell">{item.Title}</td>
                  <td className="body_cell">${item.ListPrice.Minimum}</td>
                  <td className="body_cell">${item.SalePrice.Minimum}</td>
                  <td className="body_cell">${item.Savings}</td>
                  <td className="body_cell">
                    <a className="body_link" href={item.Url}>
                      Go to deal
                    </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ) : (
        '...loading'
      )}
    </div>
  );
};
