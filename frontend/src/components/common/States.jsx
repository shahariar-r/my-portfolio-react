export function Loading() {
  return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', padding:'5rem' }}>
      <div style={{ width:32, height:32, border:'2px solid var(--border)', borderTopColor:'var(--ink)', borderRadius:'50%', animation:'spin 0.7s linear infinite' }} />
    </div>
  )
}
export function Empty({ message = 'Nothing here yet.' }) {
  return (
    <div style={{ textAlign:'center', padding:'5rem 2rem', color:'var(--ink-4)' }}>
      <div style={{ fontFamily:'var(--display)', fontSize:'3rem', fontStyle:'italic' }}>∅</div>
      <p style={{ fontSize:'14px', marginTop:'0.5rem' }}>{message}</p>
    </div>
  )
}
export function ErrorMsg({ message }) {
  return <div style={{ textAlign:'center', padding:'3rem', color:'#c0392b', fontSize:'14px' }}>Error: {message}</div>
}