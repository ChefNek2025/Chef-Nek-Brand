import { ImageResponse } from 'next/og';
export const dynamic = 'force-static';

export const alt = 'Chef Nek — Where Culinary Creativity Meets Technology';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: 80,
          background: 'radial-gradient(circle at 85% 0%, rgba(212,175,55,0.35), transparent 50%), radial-gradient(circle at 0% 100%, rgba(74,222,128,0.22), transparent 50%), #080B12',
          color: '#F8FAFC',
        }}
      >
        <div style={{ fontSize: 22, letterSpacing: 8, color: '#D4AF37', textTransform: 'uppercase' }}>Chef · Creator · Educator · Developer</div>
        <div style={{ fontSize: 170, fontWeight: 700, letterSpacing: -6, lineHeight: 1, marginTop: 24, display: 'flex' }}>
          CHEF&nbsp;<span style={{ color: '#D4AF37' }}>NEK</span>
        </div>
        <div style={{ fontSize: 40, color: '#94A3B8', marginTop: 24 }}>Where Culinary Creativity Meets Technology</div>
      </div>
    ),
    size,
  );
}
