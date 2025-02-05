import { Link } from 'react-router-dom';
interface BreadcrumbProps {
  pageName: string;
}
const Breadcrumb = ({ pageName }: BreadcrumbProps) => {
  return (
    <div className='rounded-sm border mb-6 pt-4 pr-3 pl-3 border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark'>
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          {pageName}
        </h2>

        <nav>
          <ol className="flex items-center gap-2">
            <li>
              <Link className="font-medium" to="/">
                Dashboard /
              </Link>
            </li>
            <li className="font-medium text-primary">{pageName}</li>
          </ol>
        </nav>
      </div>
    </div>
  );
};

export default Breadcrumb;
