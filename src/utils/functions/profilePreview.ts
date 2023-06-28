import { ChangeEvent } from "react";

export const handleProfilePreview = (
  e: ChangeEvent<HTMLInputElement>,
  setPreview: React.Dispatch<React.SetStateAction<string>>
): void => {
  const file: File | undefined = e.target.files?.[0];
  const reader: FileReader = new FileReader();

  if (file) {
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result as string);
    };
  }
};
