import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

// Schema validasi Yup
const schema = yup.object().shape({
  nama: yup.string().required("Nama wajib diisi"),
  status: yup.string().required("Status wajib diisi"),
  judul: yup.string().required("Judul wajib diisi"),
  lokasiTemuan: yup.string().required("Lokasi Temuan wajib diisi"),
  waktu: yup.date().required("Waktu wajib diisi"),
  jenisTemuan: yup
    .string()
    .oneOf(["USA", "USC"])
    .required("Jenis temuan wajib diisi"),
  penyebabKetidaksesuaian: yup.string(),
  tindakanPerbaikan: yup.string(),
  tindakanPencegahan: yup.string(),
});

const FormFindingUsaUsc = ({ onClose, mutate, isEdit, initialData }) => {
  const [previewSebelum, setPreviewSebelum] = useState(null);
  const [previewClosing, setPreviewClosing] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialData || {}, // Prepopulate data in edit mode
  });

  useEffect(() => {
    if (isEdit && initialData?.fotoSebelum) {
      setPreviewSebelum(initialData.fotoSebelum);
    }
    if (isEdit && initialData?.fotoClosing) {
      setPreviewClosing(initialData.fotoClosing);
    }
  }, [isEdit, initialData]);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (name === "fotoSebelum") {
      setValue("fotoSebelum", file);
      setPreviewSebelum(URL.createObjectURL(file));
    } else if (name === "fotoClosing") {
      setValue("fotoClosing", file);
      setPreviewClosing(URL.createObjectURL(file));
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (key === "waktu") {
        formData.append("waktu", new Date(data[key]).toISOString()); // Convert to ISO format
      } else {
        formData.append(key, data[key]);
      }
    });

    // Append file if available
    if (data.fotoSebelum) {
      formData.append("fotoSebelum", data.fotoSebelum);
    }
    if (data.fotoClosing) {
      formData.append("fotoClosing", data.fotoClosing);
    }

    try {
      if (isEdit) {
        await axios.patch(
          `${process.env.REACT_APP_API_URL}/usaTemuan/${initialData.id}`,
          formData
        );
        toast.success("Data USA Temuan berhasil diperbarui!", {
          position: "top-right",
        });
      } else {
        await axios.post(
          `${process.env.REACT_APP_API_URL}/usaTemuan`,
          formData
        );
        toast.success("Data USA Temuan berhasil dibuat!", {
          position: "top-right",
        });
      }
      mutate();
      onClose();
    } catch (error) {
      console.error("Error saving data:", error);
      toast.error("Gagal menyimpan data. Silakan coba lagi.", {
        position: "top-right",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="text-center text-xl font-bold">
        {isEdit ? "Edit Finding USA OR USC" : "Input Finding USA OR USC"}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nama */}
        <div className="flex flex-col">
          Nama:
          <input
            {...register("nama")}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.nama && <p className="text-red-500">{errors.nama.message}</p>}
        </div>

        {/* Status */}
        <label className="flex flex-col">
          Status:
          <input
            {...register("status")}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.status && (
            <p className="text-red-500">{errors.status.message}</p>
          )}
        </label>

        {/* Judul */}
        <label className="flex flex-col">
          Judul:
          <input
            {...register("judul")}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.judul && (
            <p className="text-red-500">{errors.judul.message}</p>
          )}
        </label>

        {/* Lokasi Temuan */}
        <label className="flex flex-col">
          Lokasi Temuan:
          <input
            {...register("lokasiTemuan")}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.lokasiTemuan && (
            <p className="text-red-500">{errors.lokasiTemuan.message}</p>
          )}
        </label>

        {/* Area Spesifik */}
        <label className="flex flex-col">
          Area Spesifik:
          <input
            {...register("areaSpesifik")}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Jenis Temuan */}
        <label className="flex flex-col">
          Jenis Temuan:
          <select
            {...register("jenisTemuan")}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="USA">USA (Unsafe Action)</option>
            <option value="USC">USC (Unsafe Condition)</option>
          </select>
          {errors.jenisTemuan && (
            <p className="text-red-500">{errors.jenisTemuan.message}</p>
          )}
        </label>

        {/* USC Condition Terkait */}
        <label className="flex flex-col">
          USC Condition Terkait:
          <input
            {...register("uscConditionTerkait")}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* USA Practice Terkait */}
        <label className="flex flex-col">
          USA Practice Terkait:
          <input
            {...register("usaPracticeTerkait")}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Penyebab Ketidaksesuaian */}
        <label className="flex flex-col">
          Penyebab Ketidaksesuaian:
          <input
            {...register("penyebabKetidaksesuaian")}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Tindakan Perbaikan */}
        <label className="flex flex-col">
          Tindakan Perbaikan:
          <input
            {...register("tindakanPerbaikan")}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Tindakan Pencegahan */}
        <label className="flex flex-col">
          Tindakan Pencegahan:
          <input
            {...register("tindakanPencegahan")}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </label>

        {/* Waktu */}
        <label className="flex flex-col">
          Waktu:
          <input
            type="date"
            {...register("waktu")}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.waktu && (
            <p className="text-red-500">{errors.waktu.message}</p>
          )}
        </label>

        {/* Foto Sebelum */}
        <label className="flex flex-col">
          Foto Sebelum:
          <input
            type="file"
            name="fotoSebelum"
            onChange={handleFileChange}
            className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {previewSebelum && (
            <img
              src={previewSebelum}
              alt="Preview Foto Sebelum"
              className="mt-2 h-32 w-32 object-cover"
            />
          )}
        </label>

        {isEdit && (
          <>
            {/* Foto Closing */}
            <label className="flex flex-col">
              Foto Closing:
              <input
                type="file"
                name="fotoClosing"
                onChange={handleFileChange}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {previewClosing && (
                <img
                  src={previewClosing}
                  alt="Preview Foto Closing"
                  className="mt-2 h-32 w-32 object-cover"
                />
              )}
            </label>

            {/* Status Akhir */}
            <label className="flex flex-col">
              Status Akhir:
              <input
                {...register("statusAkhir")}
                className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </>
        )}
      </div>

      <div className="flex justify-end space-x-2 mt-4">
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-black py-2 px-4 rounded transition duration-200"
        >
          Batal
        </button>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded transition duration-200"
        >
          {isEdit ? "Update" : "Kirim"}
        </button>
      </div>
    </form>
  );
};

export default FormFindingUsaUsc;
