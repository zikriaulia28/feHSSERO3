import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import usePermitData from "../hooks/usePermitData";
import useUserData from "../hooks/useUserData";
import PermitTable from "../components/PermitTable";
import FormClosePermit from "../components/FormClosePermit";
import FormPermitDriving from "../components/FormPermitDriving";
import Modal from "../components/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCarSide,
  faChartPie,
  faChartLine,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import useSWR from "swr";
import useCarData from "../hooks/useCarData";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Cookies from "js-cookie";
import MainLayout from "../components/MainLayout";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  useEffect(() => {
    document.title = "Home - HSSE TGI RO 3";
  }, []);

  const { permitData, permitError, mutate, handleUpdateStatus } =
    usePermitData();
  const { carData, carError } = useCarData();
  const { userData, userError } = useUserData();
  const getAvailableCars = () => {
    if (!carData || !permitData) return [];
    return carData.filter(
      (car) =>
        !permitData.some(
          (permit) => permit.carId === car.id && !permit.kmAkhir // Filter out cars with ongoing permits (kmAkhir is null)
        )
    );
  };

  const availableCars = getAvailableCars(); // Get available cars
  // Hitung total permit dengan status "waiting"
  // Hitung total permit dengan status "waiting"
  const getTotalWaitingPermits = () => {
    if (!permitData) return 0; // Pastikan permitData ada
    return permitData.filter((permit) => permit.status === "waiting").length;
  };

  // Hitung total permit dengan status "completed"
  const getTotalCompletedPermits = () => {
    if (!permitData) return 0; // Pastikan permitData ada
    return permitData.filter((permit) => permit.status === "completed").length;
  };

  const totalWaitingPermits = getTotalWaitingPermits();
  const totalCompletedPermits = getTotalCompletedPermits();
  const getPermitWithOngoingCar = () => {
    // Cek apakah permitData tersedia dan tidak kosong
    if (!permitData) return null;

    // Temukan permit yang tidak memiliki kmAkhir (berarti mobil sedang digunakan)
    return permitData.find((permit) => permit && !permit.kmAkhir);
  };
  const isKmawal = getPermitWithOngoingCar();
  const kmAwal = isKmawal ? isKmawal.kmAwal : "Tidak ada permit aktif";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCloseModalOpen, setIsCloseModalOpen] = useState(false);
  const [selectedPermitId, setSelectedPermitId] = useState(null);
  const [totalKm, setTotalKm] = useState(0);
  const [year, setYear] = useState(new Date().getFullYear().toString());
  const monthNames = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];
  // Mendapatkan bulan saat ini
  const currentMonth = new Date().getMonth() + 1; // +1 karena getMonth() mengembalikan 0-11

  // Mengubah bulan menjadi string dengan format 2 digit
  const formattedMonth =
    currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;
  const formattedMonthToString = monthNames[formattedMonth];
  // Atur state dengan bulan saat ini sebagai default
  const [month, setMonth] = useState(formattedMonth);
  const fetcher = (url) => axios.get(url).then((res) => res.data);

  const { data: totalUsageData, error: usageError } = useSWR(
    `${process.env.REACT_APP_API_URL}/permitDriving/usage?year=${year}&month=${month}`,
    fetcher
  );

  useEffect(() => {
    if (totalUsageData) {
      // Mengambil totalKmUsed dari totalUsageData
      const totalKmUsed = totalUsageData.totalUsageLogs.reduce(
        (acc, log) => acc + log.totalKmUsed,
        0
      ); // Mengambil totalKmUsed dari setiap log
      setTotalKm(totalKmUsed); // Memperbarui state totalKm dengan totalKmUsed
      mutate();
    }
  }, [totalUsageData]);

  const handleClosePermit = (id) => {
    setSelectedPermitId(id);
    setIsCloseModalOpen(true);
  };

  const handleCloseCloseModal = () => {
    setIsCloseModalOpen(false);
    setSelectedPermitId(null);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <MainLayout titlePage="" isLogedin={true}>
      <h1 className="text-xl md:text-3xl font-bold mb-4 text-blue-600">
        Total Penggunaan Kendaraan Bulan Ini : {totalKm || 0} KM
      </h1>
      {/* Filter Inputs */}
      <div className="flex items-center space-x-4 mb-6">
        <div className="">
          <select
            onChange={(e) => setYear(e.target.value)}
            value={year}
            className="block appearance-none w-full bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          >
            <option value="">Pilih Tahun</option>
            <option value="2024">2024</option>
            <option value="2023">2023</option>
            {/* Add more years as needed */}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <div>
          <select
            onChange={(e) => setMonth(e.target.value)}
            value={month}
            className="block appearance-none w-full bg-white border border-gray-300 rounded-md py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
          >
            <option value="">Pilih Bulan</option>
            <option value="1">Januari</option>
            <option value="2">Februari</option>
            <option value="3">Maret</option>
            <option value="4">April</option>
            <option value="5">Mei</option>
            <option value="6">Juni</option>
            <option value="7">Juli</option>
            <option value="8">Agustus</option>
            <option value="9">September</option>
            <option value="10">Oktober</option>
            <option value="11">November</option>
            <option value="12">Desember</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="w-4 h-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="w-full max-w-lg mb-6">
        {usageError ? (
          <h1 className="font-bold text-xl">Data Not Found</h1>
        ) : !totalUsageData ? (
          <div>Loading...</div>
        ) : totalUsageData.totalUsageLogs.length === 0 ? (
          <div className="flex items-center justify-center h-64 bg-gray-100 rounded-lg">
            <p className="text-gray-500">Tidak ada data untuk ditampilkan</p>
          </div>
        ) : (
          <div className="bg-white p-4 rounded-lg shadow-lg">
            <Bar
              data={{
                labels: totalUsageData?.totalUsageLogs.map(
                  (item) => item.car.nopol
                ),
                datasets: [
                  {
                    label: "Total KM",
                    data: totalUsageData?.totalUsageLogs.map(
                      (item) => item.totalKmUsed
                    ),
                    backgroundColor: totalUsageData?.totalUsageLogs.map(
                      (item, index) => {
                        const colors = [
                          "rgba(75, 192, 192, 0.6)", // Warna 1
                          "rgba(255, 99, 132, 0.6)", // Warna 2
                          "rgba(255, 206, 86, 0.6)", // Warna 3
                          "rgba(54, 162, 235, 0.6)", // Warna 4
                          "rgba(153, 102, 255, 0.6)", // Warna 5
                          "rgba(255, 159, 64, 0.6)", // Warna 6
                        ];
                        return colors[index % colors.length]; // Mengulang warna jika lebih banyak bar daripada warna
                      }
                    ),
                    borderColor: totalUsageData.totalUsageLogs.map(
                      (item, index) => {
                        const colors = [
                          "rgba(75, 192, 192, 1)",
                          "rgba(255, 99, 132, 1)",
                          "rgba(255, 206, 86, 1)",
                          "rgba(54, 162, 235, 1)",
                          "rgba(153, 102, 255, 1)",
                          "rgba(255, 159, 64, 1)",
                        ];
                        return colors[index % colors.length];
                      }
                    ),
                    borderWidth: 1,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: {
                    labels: {
                      font: {
                        size: 12,
                        weight: "bold",
                      },
                      color: "#333",
                    },
                  },
                  tooltip: {
                    titleFont: {
                      size: 14,
                      weight: "bold",
                    },
                    bodyFont: {
                      size: 12,
                    },
                    backgroundColor: "rgba(0, 0, 0, 0.8)",
                    titleColor: "#fff",
                    bodyColor: "#fff",
                  },
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: "Nomor Polisi",
                      color: "#333",
                      font: {
                        size: 14,
                        weight: "bold",
                      },
                    },
                    grid: {
                      color: "rgba(200, 200, 200, 0.5)",
                    },
                  },
                  y: {
                    title: {
                      display: true,
                      text: "Total KM",
                      color: "#333",
                      font: {
                        size: 14,
                        weight: "bold",
                      },
                    },
                    grid: {
                      color: "rgba(200, 200, 200, 0.5)",
                    },
                  },
                },
              }}
            />
          </div>
        )}
      </div>

      <div className="grid md:grid-cols-2 md:gap-20 mb-8">
        {/* total user */}
        <div className="px-4 md:px-10 py-8 rounded-lg shadow-lg">
          <h2 className="font-bold mb-4 text-xl md:text-2xl">
            Jumlah User Terdaftar
          </h2>
          <div className="flex items-center justify-between">
            <div className="font-bold text-xl">{userData?.length}</div>
            <FontAwesomeIcon className="text-red-500 text-3xl" icon={faUser} />
          </div>
        </div>

        {/* total Kendaraan */}
        <div className="px-4 md:px-10 py-8 rounded-lg shadow-lg">
          <h2 className="font-bold mb-4 text-xl md:text-2xl">
            Jumlah Kendaraan Terdaftar
          </h2>
          <div className="flex items-center justify-between">
            <div className="font-bold text-xl">{carData?.length}</div>
            <FontAwesomeIcon
              className="text-blue-500 text-3xl"
              icon={faCarSide}
            />
          </div>
        </div>

        {/* total user */}
        <div className="px-4 md:px-10 py-8 rounded-lg shadow-lg">
          <h2 className="font-bold mb-4 text-xl md:text-2xl">
            Pengguna Menunggu Persetujuan
          </h2>
          <div className="flex items-center justify-between">
            <div className="font-bold text-xl">{totalWaitingPermits}</div>
            <FontAwesomeIcon
              className="text-yellow-500 text-3xl"
              icon={faChartPie}
            />
          </div>
        </div>

        {/* total user */}
        <div className="px-4 md:px-10 py-8 rounded-lg shadow-lg">
          <h2 className="font-bold mb-4 text-xl md:text-2xl">
            Penggunaan Disetujui
          </h2>
          <div className="flex items-center justify-between">
            <div className="font-bold text-xl">{totalCompletedPermits}</div>
            <FontAwesomeIcon
              className="text-purple-500 text-3xl"
              icon={faChartLine}
            />
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={handleOpenModal}
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded transition-all duration-200"
        >
          Buat Permit
        </button>
        {(() => {
          const approvedPermit = permitData.find(
            (permit) => permit.status === "approved"
          );
          if (!approvedPermit) return null; // Jika tidak ada permit yang disetujui, kembalikan null (tidak render tombol)

          return (
            <button
              onClick={() => handleClosePermit(approvedPermit.id)}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-all duration-200"
            >
              Tutup Permit
            </button>
          );
        })()}
      </div>

      <div className="overflow-x-auto">
        {permitError ? (
          <PermitTable
            permitData={permitData}
            handleUpdateStatus={handleUpdateStatus}
          />
        ) : !permitData ? (
          <div>Loading...</div>
        ) : permitData.length === 0 ? (
          <div>No permit data available</div>
        ) : (
          <PermitTable
            permitData={permitData}
            handleUpdateStatus={handleUpdateStatus}
          />
        )}
      </div>

      {isModalOpen && (
        <Modal onClose={handleCloseModal}>
          <FormPermitDriving
            onClose={handleCloseModal}
            mutate={mutate}
            availableCars={availableCars}
            permitData={permitData}
          />
        </Modal>
      )}

      {isCloseModalOpen && selectedPermitId && (
        <Modal onClose={handleCloseCloseModal} isFormCar={true}>
          <FormClosePermit
            permitId={selectedPermitId}
            onClose={handleCloseCloseModal}
            mutate={mutate}
            kmAwal={kmAwal}
          />
        </Modal>
      )}
    </MainLayout>
  );
};

export default Home;
