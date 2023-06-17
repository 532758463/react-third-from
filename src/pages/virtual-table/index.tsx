import { Table } from 'antd';
import './index.css';
import { useVirtualTable } from './useVirtualTable';
import { RouterBack } from '@src/components/router-back';

const columns = [
  {
    title: 'A',
    dataIndex: 'key',
    width: 150
  },
  {
    title: 'B',
    dataIndex: 'key'
  },
  {
    title: 'C',
    dataIndex: 'key'
  },
  {
    title: 'D',
    dataIndex: 'key'
  },
  {
    title: 'E',
    dataIndex: 'key',
    width: 200
  },
  {
    title: 'F',
    dataIndex: 'key',
    width: 100
  }
];
const data = Array.from(
  {
    length: 10000
  },
  (_, key) => ({
    key
  })
);

const VirtualTable = () => {
  const { holdHeight, tableWrapper, renderList, scrollChange } =
    useVirtualTable(data);

  return (
    <div
      className="scroll_box"
      style={{
        maxHeight: 500
      }}
      onScroll={scrollChange}
    >
      <div className="scroll_hold" style={{ height: `${holdHeight}px` }} />
      <div ref={tableWrapper}>
        <Table
          dataSource={renderList}
          className="virtual-table"
          columns={columns}
          pagination={false}
          bordered
        />
      </div>
      <RouterBack />
    </div>
  );
};
export default VirtualTable;
