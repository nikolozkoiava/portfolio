'use client';

export default function SectionFog() {
  return (
    <style>{`
      .section-padding {
        position: relative;
      }
      .section-padding::before {
        content: '';
        position: absolute;
        left: 0;
        right: 0;
        top: -80px;
        height: 160px;
        pointer-events: none;
        background: linear-gradient(
          180deg,
          transparent 0%,
          rgba(10, 10, 10, 0.7) 30%,
          rgba(10, 10, 10, 0.85) 50%,
          rgba(10, 10, 10, 0.7) 70%,
          transparent 100%
        );
        z-index: 3;
      }
      .section-padding:first-of-type::before {
        display: none;
      }
    `}</style>
  );
}