'use client';

import React, { useRef, useState } from 'react';
import { Upload, Loader2, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { uploadImageAction } from '@/actions/uploadActions';
import { toast } from 'sonner';

interface ImageUploadButtonProps {
  onUploaded: (url: string) => void;
  label?: string;
  variant?: 'button' | 'compact' | 'dropzone';
  className?: string;
}

export default function ImageUploadButton({
  onUploaded,
  label = 'Upload New Photo',
  variant = 'button',
  className = '',
}: ImageUploadButtonProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) {
      toast.error('Please select a valid image file (JPEG, PNG, WebP).');
      return;
    }

    setIsUploading(true);
    const toastId = toast.loading('Uploading photo to Cloudinary CDN...');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const res = await uploadImageAction(formData);

      if (res.success && res.url) {
        onUploaded(res.url);
        toast.success('Photo uploaded and applied successfully!', { id: toastId });
      } else {
        toast.error(res.error || 'Failed to upload photo.', { id: toastId });
      }
    } catch (err) {
      toast.error('Upload failed. Please try again.', { id: toastId });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const triggerInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`inline-block ${className}`}>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png,image/jpeg,image/jpg,image/webp"
        className="hidden"
      />

      {variant === 'button' && (
        <button
          type="button"
          onClick={triggerInput}
          disabled={isUploading}
          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#4B2A7B] hover:bg-[#3A1F60] text-white border border-[#4B2A7B] transition-all flex items-center gap-1.5 shadow-xs disabled:opacity-50 cursor-pointer"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
              <span>Uploading to Cloudinary...</span>
            </>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5 text-white" />
              <span>{label}</span>
            </>
          )}
        </button>
      )}

      {variant === 'compact' && (
        <button
          type="button"
          onClick={triggerInput}
          disabled={isUploading}
          className="p-1.5 rounded-lg bg-white hover:bg-[#FAF8F2] text-[#4B2A7B] border border-[#E5DFD3] hover:border-[#4B2A7B] transition-colors disabled:opacity-50 cursor-pointer shadow-xs"
          title="Upload new image from device"
        >
          {isUploading ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Upload className="w-3.5 h-3.5" />
          )}
        </button>
      )}

      {variant === 'dropzone' && (
        <div
          onClick={triggerInput}
          className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-colors ${
            isUploading
              ? 'border-[#4B2A7B] bg-[#4B2A7B]/5'
              : 'border-[#E5DFD3] hover:border-[#4B2A7B] bg-white hover:bg-[#FAF8F2]'
          }`}
        >
          {isUploading ? (
            <div className="flex items-center justify-center gap-2 text-xs text-[#4B2A7B] font-semibold">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Uploading image to Cloudinary...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5">
              <Upload className="w-5 h-5 text-[#4B2A7B]" />
              <span className="text-xs font-bold text-[#2B2D33]">
                Click or Drop to Upload New Photo
              </span>
              <span className="text-[10px] text-[#2B2D33]/60">
                Directly uploads to Cloudinary CDN (JPG, PNG, WebP)
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
