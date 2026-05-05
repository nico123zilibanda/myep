// "use client";

// import { useState, useEffect } from "react";
// import FormInput from "./FormInput";
// import FormSelect from "./FormSelect";
// import { Loader2 } from "lucide-react";
// import { useDictionary } from "@/lib/i18n/useDictionary";

// interface Category {
//   id: number;
//   name: string;
// }

// interface OpportunityFormProps {
//   onSubmit: (data: any) => Promise<void> | void;
//   initialData?: any;
//   categories: Category[];

// }

// export default function OpportunityForm({
//   onSubmit,
//   initialData,
//   categories,
// }: OpportunityFormProps) {
//   const [form, setForm] = useState({
//     title: initialData?.title || "",
//     description: initialData?.description || "",
//     requirements: initialData?.requirements || "",
//     howToApply: initialData?.howToApply || "",
//     deadline: initialData?.deadline
//       ? new Date(initialData.deadline).toISOString().slice(0, 10)
//       : "",
//     location: initialData?.location || "",
//     attachmentUrl: initialData?.attachmentUrl || "",
//     status: initialData?.status || "PUBLISHED",
//     categoryId: initialData?.categoryId ?? (categories[0]?.id ?? 0),
//   });

//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const t = useDictionary();
//   useEffect(() => {
//     setForm({
//       title: initialData?.title || "",
//       description: initialData?.description || "",
//       requirements: initialData?.requirements || "",
//       howToApply: initialData?.howToApply || "",
//       deadline: initialData?.deadline
//         ? new Date(initialData.deadline).toISOString().slice(0, 10)
//         : "",
//       location: initialData?.location || "",
//       attachmentUrl: initialData?.attachmentUrl || "",
//       status: initialData?.status || "PUBLISHED",
//       categoryId: initialData?.categoryId ?? (categories[0]?.id ?? 0),
//     });
//   }, [initialData, categories]);

//   const handleChange = (
//     e: React.ChangeEvent<
//       HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
//     >
//   ) => {
//     const { name, value } = e.target;
//     setForm(prev => ({
//       ...prev,
//       [name]: name === "categoryId" ? Number(value) : value,
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     try {
//       setIsSubmitting(true);
//       await onSubmit(form);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="
//     space-y-6
//     bg-(--card)
//     p-6 rounded-xl
//     border border-(--border)
//     shadow-sm
//     transition-colors
//       "
//     >
//       {/* FORM HEADER */}
//       <div className="space-y-1">
//         <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
//           {t("OPPORTUNITY_FORM_TITLE")}
//         </h3>
//         <p className="text-sm text-gray-500 dark:text-gray-400">
//           {t("OPPORTUNITY_FORM_SUBTITLE")}
//         </p>
//       </div>

//       {/* GRID */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <FormInput
//           labelKey="OPPORTUNITY_TITLE_LABEL"
//           name="title"
//           value={form.title}
//           onChange={handleChange}
//           placeholderKey="OPPORTUNITY_TITLE_PLACEHOLDER"
//           required
//         />

//         <FormInput
//           labelKey="OPPORTUNITY_LOCATION_LABEL"
//           name="location"
//           value={form.location}
//           onChange={handleChange}
//           placeholderKey="OPPORTUNITY_LOCATION_PLACEHOLDER"
//           required
//         />

//         <FormInput
//           labelKey="OPPORTUNITY_DEADLINE_LABEL"
//           name="deadline"
//           type="date"
//           value={form.deadline}
//           onChange={handleChange}
//           required
//         />

//         <FormSelect
//           labelKey="OPPORTUNITY_STATUS_LABEL"
//           name="status"
//           value={form.status}
//           onChange={handleChange}
//           placeholderKey="SELECT_PLACEHOLDER"
//           options={[
//             { value: "PUBLISHED", labelKey: "STATUS_PUBLISHED" },
//             { value: "DRAFT", labelKey: "STATUS_DRAFT" },
//             { value: "CLOSED", labelKey: "STATUS_CLOSED" },
//           ]}
//         />

//         <div className="md:col-span-2">
//           <FormInput
//             labelKey="OPPORTUNITY_DESCRIPTION_LABEL"
//             name="description"
//             value={form.description}
//             onChange={handleChange}
//             placeholderKey="OPPORTUNITY_DESCRIPTION_PLACEHOLDER"
//           />
//         </div>

//         <div className="md:col-span-2">
//           <FormInput
//             labelKey="OPPORTUNITY_REQUIREMENTS_LABEL"
//             name="requirements"
//             value={form.requirements}
//             onChange={handleChange}
//             placeholderKey="OPPORTUNITY_REQUIREMENTS_PLACEHOLDER"
//           />
//         </div>

//         <div className="md:col-span-2">
//           <FormInput
//             labelKey="OPPORTUNITY_HOW_TO_APPLY_LABEL"
//             name="howToApply"
//             value={form.howToApply}
//             onChange={handleChange}
//             placeholderKey="OPPORTUNITY_HOW_TO_APPLY_PLACEHOLDER"
//           />
//         </div>

//         <FormSelect
//           labelKey="OPPORTUNITY_CATEGORY_LABEL"
//           name="categoryId"
//           value={form.categoryId}
//           onChange={handleChange}
//           options={categories.map(c => ({
//             value: c.id,
//             label: c.name,
//           }))}
//         />

//         <FormInput
//           labelKey="OPPORTUNITY_ATTACHMENT_LABEL"
//           name="attachmentUrl"
//           value={form.attachmentUrl}
//           onChange={handleChange}
//           placeholderKey="OPPORTUNITY_ATTACHMENT_PLACEHOLDER"
//         />
//       </div>

//       {/* SUBMIT */}
//       <button
//         type="submit"
//         disabled={isSubmitting}
//         className="
//           w-full
//           flex items-center justify-center gap-2
//           bg-blue-600 hover:bg-blue-700
//           disabled:bg-blue-400
//           text-white py-3 rounded-lg
//           font-medium shadow-sm
//           transition
//         "
//       >
//         {isSubmitting && (
//           <Loader2 className="h-5 w-5 animate-spin" />
//         )}
//         {isSubmitting
//           ? t("OPPORTUNITY_SAVING_BUTTON")
//           : t("OPPORTUNITY_SAVE_BUTTON")
//         }
//       </button>
//     </form>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import FormInput from "./FormInput";
import FormSelect from "./FormSelect";
import { Loader2 } from "lucide-react";
import { useDictionary } from "@/lib/i18n/useDictionary";

interface Category {
  id: number;
  name: string;
}

interface OpportunityFormProps {
  onSubmit: (data: FormData) => Promise<void> | void;
  initialData?: any;
  categories: Category[];
}

type ResourceType = "VIDEO" | "PDF" | "LINK";

const MAX_VIDEO_SIZE = 10 * 1024 * 1024;
const MAX_PDF_SIZE = 2 * 1024 * 1024;

export default function OpportunityForm({
  onSubmit,
  initialData,
  categories,
}: OpportunityFormProps) {
  const [form, setForm] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    requirements: initialData?.requirements || "",
    howToApply: initialData?.howToApply || "",
    deadline: initialData?.deadline
      ? new Date(initialData.deadline).toISOString().slice(0, 10)
      : "",
    location: initialData?.location || "",
    status: initialData?.status || "PUBLISHED",
    categoryId: initialData?.categoryId ?? categories[0]?.id ?? 0,

    // 🔥 NEW
    resourceType: initialData?.resourceType || "",
    resourceUrl: initialData?.resourceUrl || "",
  });

  const [file, setFile] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const t = useDictionary();

  useEffect(() => {
    setForm({
      title: initialData?.title || "",
      description: initialData?.description || "",
      requirements: initialData?.requirements || "",
      howToApply: initialData?.howToApply || "",
      deadline: initialData?.deadline
        ? new Date(initialData.deadline).toISOString().slice(0, 10)
        : "",
      location: initialData?.location || "",
      status: initialData?.status || "PUBLISHED",
      categoryId: initialData?.categoryId ?? categories[0]?.id ?? 0,

      // 🔥 NEW
      resourceType: initialData?.resourceType || "",
      resourceUrl: initialData?.resourceUrl || "",
    });

    setFile(null);
  }, [initialData, categories]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;

    if (name === "resourceType") {
      setForm((prev) => ({
        ...prev,
        resourceType: value as ResourceType,
        resourceUrl: "",
      }));
      setFile(null);
      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: name === "categoryId" ? Number(value) : value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    const selectedFile = e.target.files[0];

    if (form.resourceType === "VIDEO" && selectedFile.size > MAX_VIDEO_SIZE) {
      alert("Video size too large");
      e.target.value = "";
      return;
    }

    if (form.resourceType === "PDF" && selectedFile.size > MAX_PDF_SIZE) {
      alert("PDF size too large");
      e.target.value = "";
      return;
    }

    setFile(selectedFile);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    // 🔥 VALIDATION
    if (form.resourceType === "LINK" && !form.resourceUrl.trim()) {
      return alert("Link required");
    }

    if (
      (form.resourceType === "VIDEO" || form.resourceType === "PDF") &&
      !file
    ) {
      return alert("File required");
    }

    const formData = new FormData();

    Object.entries(form).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    if (file) {
      formData.append("file", file);
    }

    try {
      setIsSubmitting(true);
      await onSubmit(formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="
        space-y-6
        bg-(--card)
        p-6 rounded-xl
        border border-(--border)
        shadow-sm
      "
    >
      {/* HEADER */}
      <div className="space-y-1">
        <h3 className="text-lg font-semibold">{t("OPPORTUNITY_FORM_TITLE")}</h3>
        <p className="text-sm text-gray-500">
          {t("OPPORTUNITY_FORM_SUBTITLE")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          labelKey="OPPORTUNITY_TITLE_LABEL"
          name="title"
          value={form.title}
          onChange={handleChange}
          required
        />

        <FormInput
          labelKey="OPPORTUNITY_LOCATION_LABEL"
          name="location"
          value={form.location}
          onChange={handleChange}
          required
        />

        <FormInput
          labelKey="OPPORTUNITY_DEADLINE_LABEL"
          name="deadline"
          type="date"
          value={form.deadline}
          onChange={handleChange}
          required
        />

        <FormSelect
          labelKey="OPPORTUNITY_STATUS_LABEL"
          name="status"
          value={form.status}
          onChange={handleChange}
          options={[
            { value: "PUBLISHED", labelKey: "STATUS_PUBLISHED" },
            { value: "DRAFT", labelKey: "STATUS_DRAFT" },
            { value: "CLOSED", labelKey: "STATUS_CLOSED" },
          ]}
        />

        <div className="md:col-span-2">
          <FormInput
            labelKey="OPPORTUNITY_DESCRIPTION_LABEL"
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>

        <div className="md:col-span-2">
          <FormInput
            labelKey="OPPORTUNITY_REQUIREMENTS_LABEL"
            name="requirements"
            value={form.requirements}
            onChange={handleChange}
          />
        </div>

        <div className="md:col-span-2">
          <FormInput
            labelKey="OPPORTUNITY_HOW_TO_APPLY_LABEL"
            name="howToApply"
            value={form.howToApply}
            onChange={handleChange}
          />
        </div>

        <FormSelect
          labelKey="OPPORTUNITY_CATEGORY_LABEL"
          name="categoryId"
          value={form.categoryId}
          onChange={handleChange}
          options={categories.map((c) => ({
            value: c.id,
            label: c.name,
          }))}
        />

        {/* 🔥 RESOURCE TYPE */}
        <FormSelect
          labelKey="OPPORTUNITY_RESOURCE_TYPE_LABEL"
          name="resourceType"
          value={form.resourceType}
          onChange={handleChange}
          options={[
            { value: "", labelKey: "SELECT_PLACEHOLDER" },
            { value: "VIDEO", labelKey: "TRAINING_TYPE_VIDEO" },
            { value: "PDF", labelKey: "TRAINING_TYPE_PDF" },
            { value: "LINK", labelKey: "TRAINING_TYPE_ARTICLE" },
          ]}
        />

        {/* 🔥 FILE */}
        {(form.resourceType === "VIDEO" || form.resourceType === "PDF") && (
          <div className="md:col-span-2 flex flex-col gap-1">
            <input
              type="file"
              accept={
                form.resourceType === "VIDEO" ? "video/*" : "application/pdf"
              }
              onChange={handleFileChange}
            />
            {file && <p className="text-xs text-green-600">✔ {file.name}</p>}
          </div>
        )}

        {/* 🔥 LINK */}
        {form.resourceType === "LINK" && (
          <div className="md:col-span-2">
            <FormInput
              labelKey="OPPORTUNITY_RESOURCE_URL_LABEL"
              name="resourceUrl"
              value={form.resourceUrl}
              onChange={handleChange}
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="
           w-full
           flex items-center justify-center gap-2
           bg-blue-600 hover:bg-blue-700
           disabled:bg-blue-400
           text-white py-3 rounded-lg
          font-medium shadow-sm
         transition
       "
      >
        {isSubmitting && <Loader2 className="h-5 w-5 animate-spin" />}
        {isSubmitting
          ? t("OPPORTUNITY_SAVING_BUTTON")
          : t("OPPORTUNITY_SAVE_BUTTON")}
      </button>
    </form>
  );
}
