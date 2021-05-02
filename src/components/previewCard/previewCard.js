
const PreviewCard = ({ name, data }) => (
  <div className="w-full h-32 relative p-2 rounded-md bg-gray-600">
    <div className="w-32">
      <img src={data} alt={name}/>
    </div>
  </div>
);

export default PreviewCard;
