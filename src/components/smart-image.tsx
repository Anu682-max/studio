import React from 'react';
import Image from 'next/image';
import { useImageUrl } from '@/lib/image-utils';

interface SmartImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  style?: React.CSSProperties;
  [key: string]: any;
}

/**
 * Smart Image component that handles both Firebase Storage and Firestore images
 */
export const SmartImage: React.FC<SmartImageProps> = ({ 
  src, 
  alt, 
  width = 200, 
  height = 200, 
  fill = false,
  className = '',
  style,
  ...props 
}) => {
  const { imageUrl, loading, error } = useImageUrl(src);

  if (loading) {
    return (
      <div 
        className={`bg-gray-200 animate-pulse flex items-center justify-center ${className}`}
        style={fill ? { position: 'absolute', inset: 0 } : { width, height, ...style }}
      >
        <span className="text-gray-400 text-sm">Loading...</span>
      </div>
    );
  }

  if (error || !imageUrl) {
    return (
      <div 
        className={`bg-gray-100 flex items-center justify-center ${className}`}
        style={fill ? { position: 'absolute', inset: 0 } : { width, height, ...style }}
      >
        <span className="text-gray-400 text-xs">No Image</span>
      </div>
    );
  }

  // For base64 images from Firestore, use regular img tag
  if (imageUrl.startsWith('data:')) {
    // Create safe props for regular img element
    const safeProps: any = {};
    
    // Only include standard img attributes
    const allowedProps = ['onClick', 'onLoad', 'onError', 'onMouseEnter', 'onMouseLeave'];
    allowedProps.forEach(prop => {
      if (props[prop]) {
        safeProps[prop] = props[prop];
      }
    });
    
    if (fill) {
      return (
        <img
          src={imageUrl}
          alt={alt}
          className={`absolute inset-0 w-full h-full object-cover ${className}`}
          style={style}
          {...safeProps}
        />
      );
    } else {
      return (
        <img
          src={imageUrl}
          alt={alt}
          width={width}
          height={height}
          className={className}
          style={style}
          {...safeProps}
        />
      );
    }
  }

  // For regular URLs (Firebase Storage), use Next.js Image component
  try {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        className={className}
        style={style}
        {...props}
      />
    );
  } catch (imageError) {
    console.error('Next.js Image error:', imageError);
    return (
      <div 
        className={`bg-gray-100 flex items-center justify-center ${className}`}
        style={fill ? { position: 'absolute', inset: 0 } : { width, height, ...style }}
      >
        <span className="text-gray-400 text-xs">Image Error</span>
      </div>
    );
  }
};