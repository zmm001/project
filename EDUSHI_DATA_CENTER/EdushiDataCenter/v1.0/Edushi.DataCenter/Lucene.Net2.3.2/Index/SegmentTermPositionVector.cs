�}�� r   ��hDIz��a	��4��_N��ꬩ=7����3N$�MX%�Q,d&��!�q�l��H���.,CP�������b�gۻzrp�y�x�V��io��c���R����N�I���4��C�<H�[~e��Q:mƜq���� �gNX��\xj�"'?Mg�A%1��I'A��q��`Џ��/`%!���s5ꬽ�\78�5�:������ ��|R����u]\ȉD�.�����o��?.�����_'Z���TK_?!Ǚ��p&�R��#�
��p�M�V��0�^R�0���L��:d%ߠJ{Ⱦv����-��K�ap�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l�0�[{��o�GS�|� �{�����'������<�N�)�G�	�.�F��5UI��	O�yb��x����M�r��%yxV~3��G�䳽�8|0��(�s2�/m.�=���ǶL��[Ą���1�v�h��1l~�W�[m���xO5ר2	��* ��:U�YS+�������%.F[,'4��HO;|���!N~�>�W�Z���
����N+�q��+���
-$�F^�l��Y�U���$�3D"��zWw��3,F+��a�`�'�"G��D���l�B���"Z��/�̲�J��{C=ox���C7,��߽�
/�:e��pMo�t	�"k͏ʨ7�ДCY'�b�$�LAac\|�م�l�&=mj�)~R��� ���tv��h�o	�P
���47��@E� G��/`���K7���8�� �.�oԄ�k|ҭO�f�e�$$l�_x�Z�7ayC���b��j��U��]ie��2�c��yIl�+�A1Z����ѕa�!?w�tw���-'_s�"AA�9���gnj6b�xĚ���!�s����f,���(��q.�J7�(��((Me	�7\�c�`v!%�g�>,���7���*tOf��3��b�G����k�Ս˓dJ�gMn.ߋm�sC��C����i���G�Vz�y�S���7.Ћ'n�� (�5'�΂������6���P��A>��{������4d�kdk���F���-��+c�{tV�� Suⓚ�ñK?�����]��r6�����ԩ���:��Hж�;7��\�s^�&ff����x�����F?~�,t�`�pz���f����~�翞��*�_ <ͽ�!���VB��U+߀[�|yF�6|&ꖐ�>����cV��9W3��b����J�������;���ٴI�i�Z����z�w֩m�G�� �ɗ�fn�S�������E�rڭ'��+����@�
,"���Ͼ�<蚍t����l�*���i�2�4��S��E��>��P0�؏��K	͆#�/��x)���B��)`����<��4 ��|��/�u4�ի�Q�ۧ
��n�]�o�wㆹ$H����t�������@��D?zH���R��0�Ϸ��@�b���1�������\m�w-�p� D�za�y�fG5��h�Fv�	J�N�Dd�_Ay�����Q�"/|�����|��F�aG�耤�
jl9XV���G��[V�Qg�A��MH�6��l-=*�B�C��:��XHJ��]}F���(W���u�
*649>ÄC��3�@�z�;���.�]�W��c�_4��tb��K��F&.m�22��o ��Ӗ ;�8k�(��u(m0���s y��=q�T7�R��m	+��2Sz�+�}Jn����Ơ�x#s:�8
�}F@����=_�f�Nc��!8>�����@ń̴;ct����h1d2�K�� x��$듚;�ҹ ��kҡ�Zw�^3x����bzsummary> Returns an array of positions in which the term is found.
		/// Terms are identified by the index at which its number appears in the
		/// term String array obtained from the <code>indexOf</code> method.
		/// </summary>
		public virtual int[] GetTermPositions(int index)
		{
			int[] result = EMPTY_TERM_POS;
			if (positions == null)
				return null;
			if (index >= 0 && index < positions.GetLength(0))
			{
				result = positions[index];
			}
			
			return result;
		}
	}
}
