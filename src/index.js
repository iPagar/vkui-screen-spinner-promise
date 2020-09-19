import React from 'react'
import PropTypes from 'prop-types'
import { PopoutWrapper, getClassName } from '@vkontakte/vkui'
import Icon36Cancel from '@vkontakte/icons/dist/36/cancel'
import Icon44Cancel from './img/Icon44Cancel.svg'
import Icon44Done from './img/Icon44Done.svg'
import Icon44Spinner from '@vkontakte/icons/dist/44/spinner'

import '@vkontakte/vkui/dist/vkui.css'
import './index.css'

class ScreenSpinnerPromise extends React.Component {
	state = { icon: null, duration: 0.25, isFetched: false }

	static propTypes = {
		onStart: PropTypes.func,
		onCancel: PropTypes.func,
		onDone: PropTypes.func
	}

	setCancel = (error, isFetched) => {
		const { duration } = this.state
		const { onCancel } = this.props

		const icon = isFetched ? (
			<Icon44Cancel
				fill={'var(--overlay_status_icon)'}
				style={{
					position: 'absolute',
					animation: `fade ${duration}s forwards`
				}}
			/>
		) : (
			<Icon36Cancel
				fill={'var(--overlay_status_icon)'}
				style={{
					position: 'absolute',
					animation: `fade ${duration}s forwards`
				}}
				onClick={this.onCancelClick}
			/>
		)
		this.setState({ icon })

		if (isFetched) {
			this.setState({ isFetched })
			setTimeout(() => onCancel(error), (duration + duration + (duration / 100) * 200) * 1000)
		}
	}

	onCancelClick = () => {
		const { duration } = this.state
		const { onCancel } = this.props

		this.setState({ isFetched: true })
		setTimeout(
			() => onCancel({ message: 'Cancelled by user' }),
			(duration + (duration / 100) * 200) * 1000
		)
	}

	setDone = success => {
		const { duration, isFetched } = this.state
		const { onDone } = this.props

		if (!isFetched) {
			const icon = (
				<Icon44Done
					fill={'var(--overlay_status_icon)'}
					style={{
						position: 'absolute',
						animation: `fade ${duration}s forwards`
					}}
				/>
			)
			this.setState({ icon, isFetched: true })

			setTimeout(() => onDone(success), (duration + duration + (duration / 100) * 200) * 1000)
		}
	}

	componentDidMount() {
		const { duration, isFetched } = this.state
		const { onStart } = this.props

		setTimeout(
			() =>
				onStart()
					.then(this.setDone)
					.catch(error => this.setCancel(error, true)),
			duration
		)

		setTimeout(() => {
			if (!isFetched) this.setCancel()
		}, 500 + duration)
	}

	render() {
		const { icon, duration, isFetched } = this.state

		return (
			<PopoutWrapper
				className={getClassName('ScreenSpinner')}
				hasMask={false}
				v="center"
				h="center"
				style={{
					animation: `fade  ${duration + (duration / 100) * 200}s ${
						isFetched ? 'reverse' : null
					} forwards`
				}}
			>
				<div className="ScreenSpinner__container Spinner">
					{!isFetched && (
						<Icon44Spinner fill={'var(--overlay_status_icon)'} className="Spinner__self" />
					)}
					{icon}
				</div>
			</PopoutWrapper>
		)
	}
}

export default ScreenSpinnerPromise
