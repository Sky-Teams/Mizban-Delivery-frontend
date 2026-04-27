import i18next from 'i18next';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { useTranslation } from 'react-i18next';
import { toLocaleDigits } from '../../utils/numberConverter';
import { useEffect, useState } from 'react';
import Dropdown from './Dropdown';
import { isRTL } from '../../utils/IsRTLDirection';
export default function Pagination({
  currentPage,
  totalPages,
  handleNextButtonClick,
  isLoading,
  handlePrevButtonClick,
  handlePageNumberClick,
  updateCurrentLimit,
  dropup,
}) {
  const { t } = useTranslation();

  const getPagesArray = () => {
    const maxVisiblePages = 4;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage < maxVisiblePages - 1) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    const pagesArray = [];
    for (let i = startPage; i <= endPage; i++) {
      pagesArray.push(i);
    }
    return {
      pagesArray,
      startPage,
      endPage,
    };
  };

  const selectedPageStyle = 'p-2 border font-bold rounded-sm border-orange-300 bg-orange-50';
  const rowNumbers = [
    { id: 1, name: toLocaleDigits(20, i18next.language), value: 20 },
    { id: 2, name: toLocaleDigits(50, i18next.language), value: 50 },
    { id: 3, name: toLocaleDigits(70, i18next.language), value: 70 },
    { id: 4, name: toLocaleDigits(100, i18next.language), value: 100 },
  ];
  const [selectedRowNumber, setSelectedRowNumber] = useState(20);
  useEffect(() => {
    updateCurrentLimit(selectedRowNumber);
  }, [selectedRowNumber]);
  return (
    <div className="flex flex-row w-full justify-between p-2 items-center">
      <div className="flex justify-center gap-4 items-center">
        <button
          onClick={handlePrevButtonClick}
          className="font-bold cursor-pointer disabled:text-gray-300 disabled:cursor-not-allowed"
          disabled={isLoading || currentPage <= 1}
        >
          <LuChevronLeft
            size={22}
            className={isRTL() ? 'rotate-180 inline-block' : 'inline-block'}
          />
          {t('PERVIOUS')}
        </button>

        <div className="flex items-center gap-2">
          {getPagesArray().startPage > 1 && (
            <>
              <button onClick={() => handlePageNumberClick(1)} className="p-2">
                1
              </button>
              {getPagesArray().startPage > 2 && <span className="p-2">...</span>}
            </>
          )}
          <ul className="flex gap-2">
            {getPagesArray().pagesArray.map((page) => (
              <li
                key={page}
                onClick={() => handlePageNumberClick(page)}
                className={
                  page === currentPage
                    ? selectedPageStyle
                    : 'p-2 cursor-pointer hover:text-orange-500'
                }
              >
                {toLocaleDigits(page, i18next.language)}
              </li>
            ))}
          </ul>

          {getPagesArray().endPage < totalPages && (
            <>
              {getPagesArray().endPage < totalPages - 1 && <span className="p-2">...</span>}
              <button onClick={() => handlePageNumberClick(totalPages)} className="p-2">
                {toLocaleDigits(totalPages, i18next.language)}
              </button>
            </>
          )}
        </div>

        <button
          onClick={handleNextButtonClick}
          className="font-bold cursor-pointer disabled:text-gray-300 disabled:cursor-not-allowed"
          disabled={isLoading || currentPage >= totalPages}
        >
          {t('NEXT')}
          <LuChevronRight
            size={20}
            className={isRTL() ? 'rotate-180 inline-block' : 'inline-block'}
          />
        </button>
      </div>
      <div className="flex gap-3">
        <div className="p-2">
          {t('PAGE')} {toLocaleDigits(currentPage, i18next.language)} {t('OF')}{' '}
          {toLocaleDigits(totalPages, i18next.language)}
        </div>
        <div className="flex gap-2">
          <label htmlFor="" className="p-2">
            {t('ROWS_NUMBER')}:
          </label>
          <Dropdown
            options={rowNumbers}
            onSelect={(val) => setSelectedRowNumber(val)}
            dropup={dropup}
            value={toLocaleDigits(selectedRowNumber, i18next.language)}
          />
        </div>
      </div>
    </div>
  );
}
