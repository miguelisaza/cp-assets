import React from 'react';
import PropTypes from 'prop-types';

import './TagPicker.scss';

const TagPicker = (props) => {
	const {
		id,
		defaultOption,
		optionList,
		storedOptionList,
		handleOnChange,
		handleOnDelete,
	} = props;

	return (
		<div className="tag-picker" id={id}>
			<select
				name="tagPicker"
				className="form-control"
				onChange={(e) => handleOnChange(e)}
			>
				<option value="">{defaultOption}</option>
				{optionList.filter((item) => !storedOptionList.find((option) => item.toString() === option?.toString())).map(
					(item) => (
						<option
							key={`item_}_${item}`}
							value={item}
						>
							{item}
						</option>
					),
				)}
			</select>
			{ storedOptionList.length > 0
			&& (
				<ul className="list-unstyled option-list">
					{storedOptionList.map((item) => (
						<li key={`list-item-${item}`}>
							<button
								type="button"
								className="btn btn-primary"
								onClick={() => handleOnDelete(item)}
							>
								{item}
								<span className="badge">X</span>
							</button>
						</li>
					))}
				</ul>
			) }
		</div>
	);
};

TagPicker.propTypes = {
	id               : PropTypes.string,
	defaultOption    : PropTypes.string.isRequired,
	optionList       : PropTypes.array.isRequired,
	storedOptionList : PropTypes.array.isRequired,
	handleOnChange   : PropTypes.func.isRequired,
	handleOnDelete   : PropTypes.func.isRequired,
};

TagPicker.defaultProps = {
	id : undefined,
};

export default TagPicker;
