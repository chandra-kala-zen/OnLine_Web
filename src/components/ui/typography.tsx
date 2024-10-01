// components/ui/typography.tsx

import React from 'react';

interface TypographyProps {
    variant: 'h1' | 'h2' | 'h3' | 'p'; // Add more variants as needed
    className?: string;
    children: React.ReactNode;
}

export const Typography: React.FC<TypographyProps> = ({ variant, className, children }) => {
    const Tag = variant; // This will be 'h1', 'h2', etc.

    return <Tag className={className}>{children}</Tag>;
};
