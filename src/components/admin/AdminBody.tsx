import { AnyObject } from "antd/es/_util/type";
import type { ColumnsType } from "antd/es/table";
import AdminGrid from "./AdminGrid";
import { AdminProps } from "./AdminInterface";
import AdminTable from "./AdminTable";

const AdminBody: React.FC<AdminProps> = ({
  params,
  updateParams,
  data,
  showItems = [],
  meta,
  isListView,
  
}) => {
  const columns: ColumnsType<AnyObject> | undefined = (
    Array.isArray(data) && data.length > 0 ? Object.keys(data[0]) : []
  )
    .filter((key) => (showItems.length ? showItems.includes(key) : true))
    .map((key) => ({
      title: key.charAt(0).toUpperCase() + key.slice(1), // Capitalize column name
      dataIndex: key,
      key,
    }));

  return (
    <>
      {/* <AdminTableHeader {...{ isListView, setIsListView }} /> */}
      {isListView ? (
        <AdminTable {...{ columns, data, params, meta, updateParams }} />
      ) : (
        <AdminGrid {...{ showItems, data, params, meta, updateParams }} />
      )}
    </>
    // <Table
    //   columns={columns}
    //   dataSource={data as any}
    //   rowKey={(record) => record._id}
    //   pagination={{
    //     current: Number(params.page),
    //     pageSize: Number(params.limit),
    //     total: meta?.total || 0,
    //     showSizeChanger: true,
    //   }}
    //   onChange={handleTableChange}
    //   className="bg-gray-900 text-white rounded-md"
    // />
  );
};

export default AdminBody;
