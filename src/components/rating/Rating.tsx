import { RatingGroup } from "@chakra-ui/react"

type RatingsProps = {
    level: number
}
export const Rating = ({ level }: RatingsProps) => {
    return (
        <RatingGroup.Root count={5} defaultValue={level} size="sm">
            <RatingGroup.HiddenInput />
            <RatingGroup.Control />
        </RatingGroup.Root>
    )
}