import React from 'react';

export default function ButtonFantasy({ label = 'Descubre Similis ✧', href = 'https://img.wattpad.com/cover/127525774-256-k499814.jpg', target = '_blank' }) {
    return (
        <a className="btn-fantasy" href={href} target={target} rel="noopener noreferrer">
            <svg className="btn-frame" viewBox="0 0 300 64" preserveAspectRatio="none" aria-hidden>
                <path className="borde-exterior" d="M 16 2 L 284 2 A 16 16 0 0 0 298 16 L 298 48 A 14 14 0 0 0 284 62 L 16 62 A 14 14 0 0 0 2 48 L 2 16 A 14 14 0 0 0 16 2 Z" />
                <path className="borde-interior" d="M 20 6 L 280 6 A 15 15 0 0 0 294 20 L 294 44 A 15 15 0 0 0 280 58 L 20 58 A 15 15 0 0 0 6 44 L 6 20 A 15 15 0 0 0 20 6 Z" />
            </svg>
            <span className="btn-text font-ui">{label}</span>
        </a>
    );
}
