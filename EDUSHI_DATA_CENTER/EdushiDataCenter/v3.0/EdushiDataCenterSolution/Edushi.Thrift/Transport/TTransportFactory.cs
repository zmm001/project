�}�� r p  �^��(nT��a	��7��_N��}���C� F����ǿ�9�P|��H��-4|$�	�!�tB����Pz.?U��g�("����"��dk�
;� �T��z���(��F>��^�BDx=?��)�nB��,xt�sWΫ��Wl�[r��} ���h׋]
V�(&i�'Ζ��]�A�p;��>\]�d�����[�Ǿ��3�Uφo�ާ	/bhoV���s��P�b�]�ӂ����}�`��D�qu��2ul���i�q��]uv�k�e�c�/�m^����JgY����̬�8p�;��"���Eէ����l�F�+�~�\�H��t�ʹp�l�a� 5 ���`A��x�|�{D��Û��eK���C�^����5�=�?��B�ܦ�ߐЂ�j�y�e�l:�=^�}7�t�\ėI�gq��{�ds �1_�V�J��3�u1�W��������������ݼ��<�O��H��ʩ&tbz>�l�2�dt:�l02&k���-+j�<�Y�F��;���}�������-0��N�r(�?�TA#�J��M�|�M�r��6F�1�>l.���%EMƝ���ؙ{fg�|O��������6T�U2z3�������z1s׻z۱��S:Ԫv��m
I��Ў�v��lUx�;�r���}�CAޟ�h��M�e��=޳}]<#���ԩz�~���2�;.�Nq$����^�Ƭ���ވ�j$ g���a$h��ђ�X��}����7�q��/���QH�dϝ=���#@_̨ƍ:�l��'� ��{fl��!�;�J�y a��⓼.m��m��Av�n	�E��b~0,�����Y��g�|<�:ެsygl�f����Y��땛~8�Q5E�!�1Ss�R���p�#�M}��ױ���M�j\��+W�Z[����I�I�,�
�A-�,fo��#�:4mݱ�9l� �!�>���A���@W��pګA�x� ����j(���F�?��V)uj�1��x��rom Mark Slee & Aditya Agarwal of Facebook:
	/// Factory class used to create wrapped instance of Transports.
	/// This is used primarily in servers, which get Transports from
	/// a ServerTransport and then may want to mutate them (i.e. create
	/// a BufferedTransport from the underlying base transport)
	/// </summary>
	public class TTransportFactory
	{
		public virtual TTransport GetTransport(TTransport trans)
		{
			return trans;
		}
	}
}
