export default function StyledTable(props) {
  return (
    <table>
      <thead>
        <tr style={{ backgroundColor: "#737373", color: "white" }}>
          <th>Name</th>
          <th>Vaccination Date</th>
          <th>Vaccination Status</th>
        </tr>
      </thead>
      <tbody>
        {props.vaccinatedArr.map(data => {
          return <tr className="vaccinated">
            <td>{data.person_name}</td>
            <td>{data.vaccination_date}</td>
            <td>Vaccine Done</td>
          </tr>
        })}
        {props.pendingArr.map(data => {
          return <tr className="pending">

            <td>{data.person_name}</td>
            <td>{data.vaccination_date}</td>
            <td>Vaccine Pending</td>
          </tr>
        })}

      </tbody>
    </table>
  );
}
