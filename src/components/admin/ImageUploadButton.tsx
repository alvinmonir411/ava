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
          className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#1B2F57] hover:bg-[#253F75] text-[#CFA76F] border border-[#B8935A]/40 transition-all flex items-center gap-1.5 shadow-sm disabled:opacity-50 cursor-pointer"
        >
          {isUploading ? (
            <>
              <Loader2 className="w-3.5 h-3.5 animate-spin text-[#CFA76F]" />
              <span>Uploading to Cloudinary...</span>
            </>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5 text-[#CFA76F]" />
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
          className="p-1.5 rounded-lg bg-[#0A1529] hover:bg-[#1B2F57] text-[#CFA76F] border border-[#B8935A]/30 transition-colors disabled:opacity-50 cursor-pointer"
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
              ? 'border-[#CFA76F] bg-[#0A1529]/80'
              : 'border-[#B8935A]/30 hover:border-[#CFA76F] bg-[#0A1529]/40 hover:bg-[#0A1529]/80'
          }`}
        >
          {isUploading ? (
            <div className="flex items-center justify-center gap-2 text-xs text-[#CFA76F] font-semibold">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Uploading image to Cloudinary...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-1.5">
              <Upload className="w-5 h-5 text-[#CFA76F]" />
              <span className="text-xs font-bold text-white">
                Click or Drop to Upload New Photo
              </span>
              <span className="text-[10px] text-white/50">
                Directly uploads to Cloudinary CDN (JPG, PNG, WebP)
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
