import { WootItem } from '../../pages/Home';
import './tableData.scss';

interface TableDataProps {
  items: WootItem[];
}

export const TableData: React.FC<TableDataProps> = ({ items }) => {
  return (
    <div className="table_data">
      <table>
        <tbody>
          {items.length
            ? items.map((item: WootItem, index) => {
                return (
                  <tr key={item.OfferId}>
                    <td>{index}</td>
                    <td>{item.Title}</td>
                    <td>{item.ListPrice.Minimum}</td>
                    <td>{item.Savings}</td>
                    <td>
                      <a href={item.Url}>Link</a>
                    </td>
                  </tr>
                );
              })
            : '...loading'}
        </tbody>
      </table>
    </div>
  );
};
