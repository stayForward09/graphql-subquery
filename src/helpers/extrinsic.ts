import { SubstrateExtrinsic } from '@subql/types';

export const checkIfExtrinsicExecuteSuccess = (extrinsic: SubstrateExtrinsic): boolean => {
    const { events } = extrinsic

    return !events.find((item) => {
        const { event: { method, section }} = item

        return method === 'ExtrinsicFailed' && section === 'system'
    })
}