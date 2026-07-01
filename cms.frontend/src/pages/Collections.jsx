import React from "react";
import CollectionHero from "../components/Collection/CollectionHero";
import CollectionStory from "../components/Collection/CollectionStory";
import CollectionCTA from "../components/Collection/CollectionCTA";
import collectionsData from "../data/collectionsData";

function Collections() {
    return (
        <main>
            <CollectionHero />

            {collectionsData.map((item) => (
                <CollectionStory
                    key={item.id}
                    item={item}
                />
            ))}

            <CollectionCTA />
        </main>
    );
}

export default Collections;