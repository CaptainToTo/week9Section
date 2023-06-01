class Gameplay extends Phaser.Scene {
	constructor() {
		super("Gameplay");
	}

	preload() {
		this.load.image("rolypoly", "./assets/rp.png");
		this.load.image("slug", './assets/slug.png');
	}

	create() {
		this.MAX_VELOCITY = -100;
		this.SLUG_VELOCITY = 100;
		this.restarting = false;

		this.rlyply = this.physics.add.sprite(100, 600, "rolypoly")
			.setScale(0.7)
			.setMaxVelocity(200, 400)
			.setVelocityX(-this.MAX_VELOCITY)
			.setSize(310, 200);
		this.rlyply.flipX = true;

		this.slug = this.physics.add.sprite(1400, 880, "slug")
			.setScale(0.7)
			.setMaxVelocity(this.SLUG_VELOCITY, 0)
			.setSize(200, 100)
			.setVelocityX(-this.SLUG_VELOCITY)
			.setImmovable(true);

			this.slug2 = this.physics.add.sprite(600, 880, "slug")
				.setScale(0.7)
				.setMaxVelocity(this.SLUG_VELOCITY, 0)
				.setSize(200, 100)
				.setVelocityX(-this.SLUG_VELOCITY)
				.setImmovable(true);

		this.text = this.add.text(700, 200, "click or tap to jump")
			.setFontSize("40pt")
			.setOrigin(0.5, 0.5);

		//ground rectangle
		this.ground = new Phaser.GameObjects.Rectangle(this, 700, 1000, 1400, 150, 0x0000ff);
		this.physics.add.existing(this.ground);
		this.ground.body.immovable = true;
		this.ground.body.allowGravity = false;

		//collision
		this.physics.add.overlap(this.rlyply, this.slug, this.handleCollision, null, this);
		this.physics.add.overlap(this.rlyply, this.slug2, this.handleCollision, null, this);
		this.physics.add.collider(this.rlyply, this.ground);
		this.physics.add.collider(this.slug, this.ground);
		this.physics.add.collider(this.slug2, this.ground);

		this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		// add a pointer down event listener
		this.input.on('pointerdown', () => {
			if (!this.rlyply.body.touching.down) return;
			let vel = this.rlyply.body.velocity.y;
			vel -= 400;
			this.rlyply.setVelocityY(vel);
		});
	}

	update(time, delta) {
		if (this.rlyply.body.touching.down && Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
			let vel = this.rlyply.body.velocity.y;
			vel -= 400;
			this.rlyply.setVelocityY(vel);
		}

		if (this.rlyply.x > 1400) {
			this.displayTextAndReset("You Win", false);
		}
		if (this.rlyply.x < -30) {
			this.displayTextAndReset("You Lose");
		}
	}

	handleCollision(player) {
		if (player.body.touching.down && this.rlyply.y > 854 && this.rlyply.x < 856) {
			this.scene.start("Gameplay2");
		}
		// } else {
		// 	player.body.setVelocityX(-125);
		// }
	}

	displayTextAndReset(text, reset = true) {
		this.text.setText(text);
		this.time.delayedCall(3000, () => {
			if (reset) this.scene.restart();
		});
	}
}

class Gameplay2 extends Phaser.Scene {
	constructor() {
		super("Gameplay2");
	}

	preload() {
		this.load.image("rolypoly", "./assets/rp.png");
		this.load.image("slug", './assets/slug.png');
	}

	create() {
		this.MAX_VELOCITY = -100;
		this.SLUG_VELOCITY = 100;
		this.restarting = false;

		this.rlyply = this.physics.add.sprite(100, 600, "rolypoly")
			.setScale(0.7)
			.setMaxVelocity(200, 400)
			.setVelocityX(-this.MAX_VELOCITY)
			.setSize(310, 200);
		this.rlyply.flipX = true;

		this.slug = this.physics.add.sprite(1400, 880, "slug")
			.setScale(0.7)
			.setMaxVelocity(this.SLUG_VELOCITY, 0)
			.setSize(200, 100)
			.setVelocityX(-this.SLUG_VELOCITY)
			.setImmovable(true);

		this.slug2 = this.physics.add.sprite(600, 880, "slug")
			.setScale(0.7)
			.setMaxVelocity(this.SLUG_VELOCITY, 0)
			.setSize(200, 100)
			.setVelocityX(-this.SLUG_VELOCITY)
			.setImmovable(true);	

		this.text = this.add.text(700, 200, "click or tap to jump")
			.setFontSize("40pt")
			.setOrigin(0.5, 0.5);

		//ground rectangle
		this.ground = new Phaser.GameObjects.Rectangle(this, 700, 1000, 1400, 150, 0x0000ff);
		this.physics.add.existing(this.ground);
		this.ground.body.immovable = true;
		this.ground.body.allowGravity = false;

		//collision
		this.physics.add.overlap(this.rlyply, this.slug, this.handleCollision, null, this);
		this.physics.add.overlap(this.rlyply, this.slug2, this.handleCollision, null, this);
		this.physics.add.collider(this.rlyply, this.ground);
		this.physics.add.collider(this.slug, this.ground);
		this.physics.add.collider(this.slug2, this.ground);

		this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
		// add a pointer down event listener
		this.input.on('pointerdown', () => {
			if (!this.rlyply.body.touching.down) return;
			let vel = this.rlyply.body.velocity.y;
			vel -= 400;
			this.rlyply.setVelocityY(vel);
		});
	}

	update(time, delta) {
		if (this.rlyply.body.touching.down && Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
			let vel = this.rlyply.body.velocity.y;
			vel -= 400;
			this.rlyply.setVelocityY(vel);
		}

		if (this.rlyply.x > 1400) {
			this.displayTextAndReset("You Win");
		}
		if (this.rlyply.x < -30) {
			this.displayTextAndReset("You Lose");
		}
	}

	handleCollision(player) {
		if (player.body.touching.down && this.rlyply.y > 854 && this.rlyply.x < 856) {
			this.scene.start("Gameplay");
		}
		// } else {
		// 	player.body.setVelocityX(-125);
		// }
	}

	displayTextAndReset(text, reset = true) {
		this.text.setText(text);
		this.time.delayedCall(3000, () => {
			if (reset) this.scene.restart();
		});
	}
}

const game = new Phaser.Game({
	scale: {
		mode: Phaser.Scale.FIT,
		autoCenter: Phaser.Scale.CENTER_BOTH,
		width: 1400,
		height: 1080
	},
	physics: {
		default: 'arcade',
		arcade: {
			debug: true,
			gravity: {
				x: 0,
				y: 300
			}
		}
	},
	scene: [Gameplay, Gameplay2],
	title: "Roly Poly: To the End",
});
