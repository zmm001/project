�}	� r �  ��a�����a	��4��_N��ꬩ=7����3N$�MX%�Q,d&��!�q�l��H���.,CP�������b�gۻzrp�y�x�V��io��c���R����N�I���4��C�<H�[~e��Q:mƜq���� �gNX��\xj�"'?Mg�A%1��I'A��q��`Џ��/`%!���s5ꬽ�\78�5�:������ ��|R����u]\ȉD�.�����o��?.�����_'Z���TK_?!Ǚ��p&�R��#�
��p�M�V��0�^R�0���L��:d%ߠJ{Ⱦv����-��K�ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�0�[{��o�GS�|� �{�����'������<�N�)�G�	�.�F��5UI��	O�yb��x����M�r��%yxV~3��G�䳽�8|0��(�s2�/m.�=���ǶL��[Ą���1�v�h��1l~�W�[m���xO5ר2	��* ��:U�YS+�������%.F[,'4��HO;|���!N~�>�W�Z���
����N+�q��+���
-$�F^�l��Y�U���$�3D"��zWw��3,F+��a�`�'�"G��^����l�B���"Z�أa�L���@��l	I_y�ۆC ~��Ң�4`�qp��iQb9�r�#aß��C�͚x_)�n�>�[Gyu |���:(�1
�:Nad�htH���N���hg��D>� �\�R��}R��DIf�;��8�ŕi���>���)���F�oԄ�k|ҭO�f�e�$$l�_x�Z�7ayC���b��j��U��]ie��2�c��yIl�*��|t�I˻9B�ˁ�w��K���\X�k��f3t��jR҃���^m�cJ?1�n�Xiŵ �Y��o:�3k����V�|���+wZ�����mv�6�F'�s-l6^r��I��H�k[k�����\���YcO�O��Ex�)�\jv��m�Q��i+�is}���+p�ݩ�]�!����S5ӕ�3
!}�ਞN놗s�:
�1 Zf�h �ݏ3����ÛU4�_@}s�\&����Y��Bk�W�Oʉ�+f��~���Ӣ|�wP"��֡%B^ᏑjQl��-�:(�\��$}R#/loO=�QG�8rZ�_���)�
�Ast�W�#��a�
z0؊kcK��2���Ѩ�G6;>��P�3F89���VP}��������Q����a�䗵����yج���(!KKa=1����0�Q�Y8'K~�a� KK.��=�*���7���)�ɣ��)%$��丕*/sM��F�b�-�[�2����ß�,(xs���č�f���#~�jPw
		}
		
		public override Lock MakeLock(System.String lockName)
		{
			return singletonLock;
		}
		
		public override void  ClearLock(System.String lockName)
		{
		}
		
	}
	
	
	class NoLock:Lock
	{
		public override bool Obtain()
		{
			return true;
		}
		
		public override void  Release()
		{
		}
		
		public override bool IsLocked()
		{
			return false;
		}
		
		public override System.String ToString()
		{
			return "NoLock";
		}
	}
}