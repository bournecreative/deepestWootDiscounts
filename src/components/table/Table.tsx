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
              <th>#</th>
              <th>Deal Description</th>
              <th>List Price</th>
              <th>Savings (based on sales price)</th>
              <th>Woot link</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item: WootItem, index) => {
              return (
                <tr className="table_row" key={item.OfferId}>
                  <td>{index + 1}</td>
                  <td>{item.Title}</td>
                  <td>{item.ListPrice.Minimum}</td>
                  <td>{item.Savings}</td>
                  <td>
                    <a href={item.Url}>Link</a>
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
