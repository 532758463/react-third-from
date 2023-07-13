import React, { useEffect, useState } from 'react';
import { Transfer, Modal, Input } from 'antd';
import type { TransferDirection } from 'antd/es/transfer';
import { pers } from './mockData';

interface RecordType {
  // key: string;
  title: string;
  code: string;
}

interface ISelectorProps {
  value?: any;
  onChange?: (val: any) => void;
}

const Selector: React.FC<ISelectorProps> = ({ value, onChange }) => {
  const [mockData, setMockData] = useState<RecordType[]>([]);
  const [targetKeys, setTargetKeys] = useState<string[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
    const values = targetKeys.join(',');
    onChange?.(values);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const getMock = () => {
    setMockData(pers.map((p) => ({ ...p, key: p.code })));
  };

  useEffect(() => {
    getMock();
  }, []);

  const filterOption = (inputValue: string, option: RecordType) =>
    option.title.indexOf(inputValue) > -1;

  const handleChange = (newTargetKeys: string[]) => {
    setTargetKeys(newTargetKeys);
  };

  const handleSearch = (dir: TransferDirection, value: string) => {
    console.log('search:', dir, value);
  };

  function getValue() {
    if (value) {
      try {
        // const selectPeoples = JSON.parse(value) || [];
        // const p = mockData
        //   ?.filter((v) => selectPeoples?.includes(v.code))
        //   .map((v) => v.title);
        // return p?.join('、');
        const newVlue = value?.split(',')
        return mockData
          ?.filter((v) => newVlue?.includes(v.code))
          ?.map((p) => p.title)
          ?.join('、');
      } catch (error) {
        return '';
      }
    }
  }
  return (
    <>
      <Input onClick={showModal} value={getValue()} />
      <Modal
        title="选择人员"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Transfer
          showSelectAll={false}
          dataSource={mockData}
          showSearch={false}
          filterOption={filterOption}
          targetKeys={targetKeys}
          onChange={handleChange}
          onSearch={handleSearch}
          render={(item) => item.title}
          listStyle={{ height: 300 }}
        />
      </Modal>
    </>
  );
};

export default Selector;
