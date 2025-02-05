import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import TableOne from '../../components/Tables/TableOne';
import TableThree from '../../components/Tables/TableThree';
import TableTwo from '../../components/Tables/TableTwo';

const ListCustomer = () => {
  return (
    <>
      <Breadcrumb pageName="Customers List" />
      <div className="flex flex-col gap-10">
        <TableThree />
      </div>
    </>
  );
};

export default ListCustomer;
