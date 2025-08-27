import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string;
}

export default function Breadcrumb({
  items,
  separator = '/',
}: BreadcrumbProps) {
  return (
    <nav className="flex mb-8" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {items.map((item, index) => (
          <li key={index} className="inline-flex items-center">
            {index > 0 && (
              <span className="mx-2 text-gray-400">{separator}</span>
            )}
            {item.href ? (
              <Link
                href={item.href}
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <span className="text-gray-500 font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
