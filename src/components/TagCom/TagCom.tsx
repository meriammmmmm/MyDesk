const TagCom = ({ value }: any) => {
  return (
    <p
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '34px',
        width: 'fit-content',
        color: '#333',
        backgroundColor: '#eee',
        fontSize: '16px',
        fontWeight: '400',
        padding: '10px 16px',
        borderRadius: '10px',
        textTransform: 'capitalize',
      }}
    >
      {value}
    </p>
  )
}

export default TagCom
