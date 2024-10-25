import React, { useState } from 'react';
import teamMembersData from '../../models/TeamMembers';
import "./Table.scss";
import 'animate.css';


const TeamMembersTable = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentTeamMembers = teamMembersData.slice(startIndex, endIndex);

    const renderTableRows = () => {
        return currentTeamMembers.map((teamMember) => (
			<tr key={teamMember.email}>
				<td><img src={teamMember.src} alt={teamMember.name}/></td>
				<td>{teamMember.name}</td>
				<td>{teamMember.status}</td>
				<td>{teamMember.email}</td>
				<td>
					<span className="tags">
						{teamMember.tags.map((tag) => (
							<span key={tag} className={`tag tag--${tag}`}>
								{tag}
							</span>
						))}
					</span>
				</td>
			</tr>
        ));
    };

	const handlePageClick = (pageNumber, event) => {
        event.preventDefault(); // Prevent page refresh
        setCurrentPage(pageNumber);
    };

    const renderPaginationLinks = () => {
        const numberOfPages = Math.ceil(teamMembersData.length / itemsPerPage);

        return (
            <ul className="pagination">
                {Array.from({ length: numberOfPages }).map((_, index) => {
                    const pageNumber = index + 1;
                    return (
                        <li key={pageNumber}>
                            <a
                                href={`?page=${pageNumber}`}
                                className={pageNumber === currentPage ? 'active' : ''}
								onClick={(event) => handlePageClick(pageNumber, event)}
                            >
                                {pageNumber}
                            </a>
                        </li>
                    );
                })}
            </ul>
        );
    };

    return (
        <div className="table-widget animate__animated  animate__slideInUp">
            <table>
                <caption>
                    Team Members
                    <span className="table-row-count">
                        ({teamMembersData.length}) Members
                    </span>
                </caption>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Status</th>
                        <th>Email address</th>
                        <th>Tags</th>
                    </tr>
                </thead>
                <tbody id="team-member-rows">
                    {renderTableRows()}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="4">
                            {renderPaginationLinks()}
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    );
};

export default TeamMembersTable;
