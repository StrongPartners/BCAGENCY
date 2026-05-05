import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const Breadcrumb = ({ items = [] }) => {
    if (!items.length) return null;

    return (
        <nav aria-label="Breadcrumb" className="container mx-auto px-4 md:px-8 pt-24 pb-2">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-400">
                {items.map((item, idx) => (
                    <li key={item.url} className="flex items-center gap-1">
                        {idx > 0 && <ChevronRight className="w-3 h-3" />}
                        {idx === items.length - 1 ? (
                            <span className="text-ink-700 font-medium">{item.name}</span>
                        ) : (
                            <Link to={item.url} className="hover:text-brand-600 transition-colors">
                                {item.name}
                            </Link>
                        )}
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default Breadcrumb;
