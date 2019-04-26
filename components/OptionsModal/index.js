import React from 'react';
import { Box, Button, Layer } from 'grommet';
import * as Icons from 'grommet-icons';

export default ({ open, onClose, actions }) => {
	return (
		open && (
			<Layer
				onEsc={onClose}
				onClickOutside={onClose}
				full="horizontal"
				position="bottom"
				responsive={false}
			>
				{actions.map(action => {
					const Icon = Icons[action.icon];
					return (
						<Button
							key={action.id}
							plain
							label={
								<Box pad="medium" direction="row" fill gap="medium">
									<Icon />{action.label}
								</Box>
							}
							onClick={action.action}
						/>
					);
				})}
			</Layer>
		)
	);
};
